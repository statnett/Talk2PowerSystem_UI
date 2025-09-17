import { securityConfigModelMapper } from "./mappers/security-configuration-mapper";
import SecurityRestServiceModule from "./security.rest.service";

const dependencies = [
    SecurityRestServiceModule.name
];

const SecurityServiceModule = angular.module('tt2ps.services.security-service', dependencies);
SecurityServiceModule.factory('SecurityService', SecurityService);

SecurityService.$inject = ['SecurityRestService'];

/**
 * SecurityService providing security-related services.
 */
function SecurityService(SecurityRestService) {

    /**
     * Retrieves the security configuration from the backend and maps it to the client model.
     *
     * @function
     * @returns {Promise<Object>} A promise that resolves to the mapped security configuration.
     */
    const getConfiguration = () => {
        return SecurityRestService.getConfiguration()
            .then((response) => {
                return securityConfigModelMapper(response.data);
            });
    };

    return {
        getConfiguration
    };
}

export default SecurityServiceModule;
