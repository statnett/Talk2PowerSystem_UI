import {SecurityConfigurationModel} from "../../../models/security/security-configuration";

/**
 * Converts the response from the server to a SecurityConfigurationModel instance.
 * @param {*} data
 * @return {SecurityConfigurationModel|undefined}
 */
export const securityConfigModelMapper = (data) => {
    if (!data) {
        return;
    }
    return new SecurityConfigurationModel({
        enabled: data.enabled,
        clientId: data.clientId,
        authority: data.authority,
        logout: data.logout,
        loginRedirect: data.loginRedirect,
        logoutRedirect: data.logoutRedirect
    });
};
