/**
 * AngularJS module providing authentication services.
 */

import {PublicClientApplication, InteractionRequiredAuthError} from '@azure/msal-browser';
import angular from 'angular';
import SecurityContextServiceModule from './security-context.service';
import {AuthenticationState} from "../../models/security/authentication-state";

const dependencies = [
    SecurityContextServiceModule.name
];

const AuthenticationModule = angular.module('tt2ps.services.authentication-service', dependencies);
AuthenticationModule.factory('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$q', '$rootScope', '$location', '$window', 'SecurityContextService'];

/**
 * AuthenticationService handles login, logout, access token acquisition, and tracks authentication state..
 */
function AuthenticationService($q, $rootScope, $location, $window, SecurityContextService) {
    let msalInstance = null;
    let _securityConfiguration = null;

    /**
     * Wraps an async function in a $q promise and ensures $rootScope digest.
     *
     * @param {Function} fn - The async function to wrap.
     * @returns {Promise<any>} A promise resolving or rejecting with the async result.
     */
    const wrapAsync = (fn) => {
        return $q((resolve, reject) => {
            Promise.resolve(fn())
                .then(resolve)
                .catch(reject)
                .finally(() => $rootScope.$applyAsync());
        });
    };

    /**
     * Initializes the MSAL instance with the given security configuration.
     *
     * @param {SecurityConfigurationModel} securityConfiguration - Configuration object with clientId, authority, loginRedirect, etc.
     * @returns {angular.Promise<PublicClientApplication>} Promise resolving with the MSAL instance.
     */
    const initialize = (securityConfiguration) => {
        _securityConfiguration = securityConfiguration;
        return wrapAsync(async () => {
            if (msalInstance) return msalInstance;

            const config = {
                auth: {
                    clientId: _securityConfiguration.frontendAppClientId,
                    authority: _securityConfiguration.authority,
                    redirectUri: _securityConfiguration.loginRedirect,
                    postLogoutRedirectUri: _securityConfiguration.logoutRedirect
                },
                cache: {
                    cacheLocation: 'localStorage',
                    storeAuthStateInCookie: false,
                },
                system: {
                    loggerOptions: {
                        loggerCallback: (level, message) => {
                            if (level <= 2) console.log('[MSAL]', message);
                        },
                        piiLoggingEnabled: false,
                    },
                },
            };

            msalInstance = await PublicClientApplication.createPublicClientApplication(config);

            // Handle redirect login response
            await wrapAsync(async () => {
                const response = await msalInstance.handleRedirectPromise();
                await loginResponseHandler(response);
            });

            return msalInstance;
        });
    };

    /**
     * Gets the currently active account.
     *
     * @returns {angular.Promise<Object|null>} Promise resolving with the active account or null.
     */
    const getActiveAccount = () => wrapAsync(() => msalInstance?.getActiveAccount() || null);

    /**
     * Checks if the user is authenticated.
     *
     * @returns {angular.Promise<boolean>} Promise resolving with true if authenticated, false otherwise.
     */
    const isAuthenticated = () => getActiveAccount().then(account => !!account);

    /**
     * Logs in the user. Updates the SecurityContextService authentication state. Since logout is performed locally only
     * (without ending the Entra ID session), login will always prompt the user for credentials.
     *
     * @returns {angular.Promise<Object>} Promise resolving with the authenticated account.
     * @throws Will throw an error if login fails.
     */
    const login = () =>
        wrapAsync(async () => {
            SecurityContextService.updateAuthenticationState(AuthenticationState.AUTHENTICATION_IN_PROGRESS);
            cleanStorage();
            await msalInstance.loginRedirect({
                scopes: _securityConfiguration.scopes,
                prompt: "login",
                redirectStartPage: _securityConfiguration.loginRedirect
            });
            return msalInstance.getActiveAccount();
        });

    /**
     * Logouts locally only, as described in MSAL docs: skipping the server sign‑out
     * (https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/logout.md#skipping-the-server-sign-out)
     *
     * @returns {angular.Promise<void>} Promise resolving when logout completes.
     */
    const logout = () =>
        wrapAsync(async () => {
            const account = msalInstance.getActiveAccount();
            if (account) {
                await msalInstance.logoutRedirect({
                    account,
                    onRedirectNavigate: () => {
                        // Return false so the navigation (and thus server-side logout) is skipped
                        return false;
                    }
                });
            }
            SecurityContextService.updateAuthenticationState(AuthenticationState.NOT_AUTHENTICATED);
            SecurityContextService.updateAuthenticatedUser(undefined);
            msalInstance.setActiveAccount(null);
            cleanStorage();
        });

    /**
     * Acquires an access token.
     *
     * @returns {angular.Promise<string>} Promise resolving with the access token.
     * @throws Will throw an error if no active account is available or token acquisition fails.
     */
    const getIdToken = () =>
        wrapAsync(async () => {
            const account = msalInstance.getActiveAccount();
            if (!account) {
                throw new Error('No active account');
            }

            const request = {account};
            try {
                const res = await msalInstance.acquireTokenSilent(request);
                return res.idToken;
            } catch (err) {
                if (err instanceof InteractionRequiredAuthError) {
                    const res = await msalInstance.acquireTokenPopup(request);
                    return res.idToken;
                }
                throw err;
            }
        });

    /**
     * Acquires an access token.
     *
     * @returns {angular.Promise<string>} Promise resolving with the access token.
     * @throws Will throw an error if no active account is available or token acquisition fails.
     */
    const getAccessToken = () =>
      wrapAsync(async () => {
          const account = msalInstance.getActiveAccount();
          if (!account) throw new Error('No active account');

          const request = {account};
          try {
              const res = await msalInstance.acquireTokenSilent(request);
              return res.accessToken;
          } catch (err) {
              if (err instanceof InteractionRequiredAuthError) {
                  const res = await msalInstance.acquireTokenPopup(request);
                  return res.accessToken;
              }
              throw err;
          }
      });

    /**
     * Handles the response returned by MSAL redirect login.
     *
     * @param {Object} response - The response from handleRedirectPromise()
     * @returns {Promise<void>}
     */
    const loginResponseHandler = async (response) => {
        cleanStorage();

        if (response?.account) {
            msalInstance.setActiveAccount(response.account);
            SecurityContextService.updateAuthenticationState(AuthenticationState.AUTHENTICATED);
        } else if (await isAuthenticated()) {
            SecurityContextService.updateAuthenticationState(AuthenticationState.AUTHENTICATED);
        } else {
            SecurityContextService.updateAuthenticationState(AuthenticationState.NOT_AUTHENTICATED);
        }

        clearRedirectUrl();
    };

    /**
     * Cleans up session storage. This is important to:
     * - Prevents MSAL from thinking a login is still in progress;
     * - Avoids errors if the user logs in multiple times in the same session.
     */
    const cleanStorage = () => {
        const itemKey = "msal.interaction.status";
        if (sessionStorage.getItem(itemKey)) {
            sessionStorage.removeItem(itemKey);
        }
    };

    /**
     * Clears temporary query parameters and hash added by MSAL after redirect login.
     * Updates the browser URL to either the configured redirect URL or the current path,
     * without reloading the page.
     */
    const clearRedirectUrl = () => {
        let redirectUrl = _securityConfiguration?.loginRedirect;

        if (!redirectUrl) {
            // Remove query parameters and hash
            $location.search({});
            $location.hash('');
            redirectUrl = $window.location.origin + $location.path();
        } else {
            $location.url(redirectUrl);
        }

        // Update the browser URL without reloading the page
        $window.history.replaceState({}, document.title, redirectUrl);
    };

    return {
        initialize,
        isAuthenticated,
        getActiveAccount,
        login,
        logout,
        getIdToken,
        getAccessToken
    };
}

export default AuthenticationModule;
