/**
 * Constants representing event names used in the TT2PS application.
 * These events can be emitted and listened to for reacting to changes in application state.
 */
export const TT2PSEventName = {
    /**
     * Emitted when the security configuration has changed.
     */
    SECURITY_CONFIGURATION_CHANGED: 'securityConfigurationChanged',

    /**
     * Emitted when the authenticated user changes.
     */
    AUTHENTICATED_USER_CHANGED: 'authenticatedUserChanged',

    /**
     * Emitted when the authentication state changes (e.g., from not authenticated to authenticated).
     */
    AUTHENTICATION_STATE_CHANGED: 'authenticationStateChanged',

    /**
     * Emitted when the components information has changed.
     */
    COMPONENTS_INFO_CHANGED: 'componentsInfoChanged'
};
