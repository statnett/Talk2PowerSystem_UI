import {DEVELOPMENT} from "../../configurations/app-configurations";
import {ChatRestServiceFakeBackend} from "../chat/chat.rest.service.fake.backend";

const SecurityRestServiceModule = angular.module('tt2ps.services.security-rest-service', []);
SecurityRestServiceModule.factory('SecurityRestService', SecurityRestService);

SecurityRestService.$inject = ['$http'];

const SECURITY_CONFIGURATION_ENDPOINT = 'rest/authentication/config';

const _fakeBackend = new ChatRestServiceFakeBackend();

function SecurityRestService($http) {

    /**
     * Fetches the security configuration from the backend.
     *
     * @returns {Promise<Object>} Promise resolving to the security configuration object.
     */
    const getConfiguration = () => {
        if (DEVELOPMENT) {
            return $http.get(SECURITY_CONFIGURATION_ENDPOINT)
                .catch(() => {
                    return _fakeBackend.getConfiguration();
                });
        }
        return $http.get(SECURITY_CONFIGURATION_ENDPOINT);
    };

    return {
        getConfiguration
    }
}

export default SecurityRestServiceModule;
