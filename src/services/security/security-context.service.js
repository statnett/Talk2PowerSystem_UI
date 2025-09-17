import {cloneDeep} from 'lodash';
import {TT2PSEventName} from "../../models/tt2ps-event-name";
import {AuthenticationState} from "../../models/security/authentication-state";
const SecurityContextServiceModule = angular.module('tt2ps.services.security-context-service', []);
SecurityContextServiceModule.factory('SecurityContextService', SecurityContextService);

SecurityContextService.$inject = ['EventEmitterService'];


function SecurityContextService(EventEmitterService) {

    /**
     * @type {SecurityConfigurationModel|undefined}
     */
    let _securityConfiguration = undefined;

    /**
     *
     * @type {UserModel}
     */
    let _authenticatedUser = undefined;

    /**
     * Return the security configuration.
     * @return {SecurityConfigurationModel|undefined}
     */
    const getSecurityConfiguration = () => {
        return cloneDeep(_securityConfiguration);
    }

    /**
     * Updates the security configuration and emits the 'securityConfigurationChanged' event to notify listeners that
     * the security configuration has changed.
     *
     * @param {SecurityConfigurationModel|undefined} securityConfiguration - The security configuration that is being updated.
     */
    const updateSecurityConfiguration = (securityConfiguration) => {
        _securityConfiguration = cloneDeep(securityConfiguration);
        emit(TT2PSEventName.SECURITY_CONFIGURATION_CHANGED, getSecurityConfiguration());
    };

    /**
     * Subscribes to the 'securityConfigurationChanged' event.
     * @param {function} callback - The callback to be called when the event is fired.
     *
     * @return {function} unsubscribe function.
     */
    const onSecurityConfigurationChanged = (callback) => {
        if (_securityConfiguration && angular.isFunction(callback)) {
            callback(getSecurityConfiguration());
        }
        return subscribe(TT2PSEventName.SECURITY_CONFIGURATION_CHANGED, (chats) => callback(chats));
    }

    /**
     * Return the authenticated user of undefined.
     * @return {UserModel|undefined}
     */
    const getAuthenticatedUser = () => {
        return cloneDeep(_authenticatedUser);
    }

    /**
     * Updates the authenticated user and emits the 'authenticatedUserChanged' event to notify listeners that
     * the authenticated user has changed.
     *
     * @param {UserModel|undefined} user - The authenticated user that is being updated.
     */
    const updateAuthenticatedUser = (user) => {
        _authenticatedUser = cloneDeep(user);
        emit(TT2PSEventName.AUTHENTICATED_USER_CHANGED, getAuthenticatedUser());
    };

    /**
     * Subscribes to the 'authenticatedUserChanged' event.
     * @param {function} callback - The callback to be called when the event is fired.
     *
     * @return {function} unsubscribe function.
     */
    const onAuthenticatedUserChanged = (callback) => {
        if (_authenticatedUser && angular.isFunction(callback)) {
            callback(getAuthenticatedUser());
        }
        return subscribe(TT2PSEventName.AUTHENTICATED_USER_CHANGED, (chats) => callback(chats));
    }

    /**
     * @type {'NOT_AUTHENTICATED' | 'AUTHENTICATION_IN_PROGRESS' | 'AUTHENTICATED'}
     * @private
     */
    let _authenticationState = AuthenticationState.NOT_AUTHENTICATED;

    /**
     * Returns the current authentication state.
     * @return {'NOT_AUTHENTICATED' | 'AUTHENTICATION_IN_PROGRESS' | 'AUTHENTICATED'}
     */
    const getAuthenticationState = () => {
        return _authenticationState;
    };

    /**
     * Updates the authentication state and emits the 'authenticationStateChanged' event to notify listeners that
     * the authentication state has changed.
     *
     * @param {'NOT_AUTHENTICATED' | 'AUTHENTICATION_IN_PROGRESS' | 'AUTHENTICATED'} authenticationState - The authentication state that is being updated.
     */
    const updateAuthenticationState = (authenticationState) => {
        _authenticationState = authenticationState;
        emit(TT2PSEventName.AUTHENTICATION_STATE_CHANGED, getAuthenticationState());
    };

    /**
     * Subscribes to the 'authenticationStateChanged' event.
     * @param {function} callback - The callback to be called when the event is fired.
     *
     * @return {function} unsubscribe function.
     */
    const onAuthenticationStateChanged = (callback) => {
        if (angular.isFunction(callback)) {
            callback(getAuthenticationState());
        }
        return subscribe(TT2PSEventName.AUTHENTICATION_STATE_CHANGED, (authenticationState) => callback(authenticationState));
    }

    /**
     * Emits an event with a deep-cloned payload using the EventEmitterService.
     *
     * @param {string} tT2PSEventName - The name of the event to emit. It must be a value from {@link TT2PSEventName}.
     * @param {*} payload - The data to emit with the event. The payload is deep-cloned before emission.
     */
    const emit = (tT2PSEventName, payload) => {
        EventEmitterService.emitSync(tT2PSEventName, cloneDeep(payload));
    };

    /**
     * Subscribes to an event with the specified callback using the EventEmitterService.
     *
     * @param {string} tT2PSEventName - The name of the event to subscribe to. It must be a value from {@link TT2PSEventName}.
     * @param {function} callback - The function to call when the event is emitted.
     * @return {function} - Returns a function that can be called to unsubscribe from the event.
     */
    const subscribe = (tT2PSEventName, callback) => {
        return EventEmitterService.subscribeSync(tT2PSEventName, (payload) => callback(payload));
    };

    return {
        emit,
        subscribe,
        getSecurityConfiguration,
        updateSecurityConfiguration,
        onSecurityConfigurationChanged,
        getAuthenticatedUser,
        updateAuthenticatedUser,
        onAuthenticatedUserChanged,
        getAuthenticationState,
        updateAuthenticationState,
        onAuthenticationStateChanged
    }
}

export default SecurityContextServiceModule;
