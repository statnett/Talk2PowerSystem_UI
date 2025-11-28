const AuthenticationInterceptorModule = angular.module('tt2ps.interceptors.authentication', []);

AuthenticationInterceptorModule.factory('AuthenticationInterceptor', AuthenticationInterceptor);

AuthenticationInterceptor.$inject = ['SecurityContextService', 'AuthenticationService'];

/**
 * Intercepts HTTP requests to add authentication headers.
 */
function AuthenticationInterceptor(SecurityContextService, AuthenticationService) {
    let securityEnabled = false;

    SecurityContextService.onSecurityConfigurationChanged(
        (securityConfiguration) => securityEnabled = securityConfiguration.enabled
    );

    return {
        'request': function (config) {
            const headers = config.headers || {};
            if (securityEnabled && config.url.includes('rest/') && !config.url.includes('rest/authentication/config')) {
                return AuthenticationService.getAccessToken().then(token => {
                    if (token) {
                        headers['Authorization'] = `Bearer ${token}`;
                    }
                    config.headers = headers;
                    return config;
                });
            }

            config.headers = headers;
            return config;
        }
    }
}

export default AuthenticationInterceptorModule;
