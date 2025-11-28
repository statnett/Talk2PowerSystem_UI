/**
 * Represents the security configuration settings for authentication.
 */
export class SecurityConfigurationModel {
    /**
     * Creates a new SecurityConfigurationModel instance.
     *
     * @param {Object} [data={}] - The configuration data.
     * @param {boolean} [data.enabled=false] - Indicates if security is enabled.
     * @param {string} [data.clientId] - The application (client) ID registered in Microsoft Entra ID.
     * @param {string} [data.authority] - The authority URL (tenant-specific or common) used for authentication.
     * @param {string} [data.logout] - The logout endpoint URL.
     * @param {string} [data.loginRedirect] - The URL to redirect to after successful login.
     * @param {string} [data.logoutRedirect] - The URL to redirect to after logout.
     */
    constructor(data = {}) {
        /**
         * Indicates if security is enabled.
         * @type {boolean}
         */
        this.enabled = data.enabled !== undefined ? data.enabled : false;

        /**
         * The application (client) ID registered in Microsoft Entra ID.
         * @type {string|undefined}
         */
        this.clientId = data.clientId;

        /**
         * The front-end application (client) ID registered in Microsoft Entra ID.
         */
        this.frontendAppClientId = data.frontendAppClientId;

        /**
         * The list of OAuth scopes requested by the front-end application.
         *
         * @type {string[]}
         */
        this.scopes = data.scopes;

        /**
         * The authority URL (tenant-specific or common) used for authentication.
         * Example: "https://login.microsoftonline.com/{tenantId}"
         * @type {string|undefined}
         */
        this.authority = data.authority;

        /**
         * The logout endpoint URL.
         * @type {string|undefined}
         */
        this.logout = data.logout;

        /**
         * URL to redirect to after login.
         * Must match the redirect URI registered in the Azure app.
         * @type {string|undefined}
         */
        this.loginRedirect = data.loginRedirect;

        /**
         * URL to redirect to after logout.
         * @type {string|undefined}
         */
        this.logoutRedirect = data.logoutRedirect;
    }
}
