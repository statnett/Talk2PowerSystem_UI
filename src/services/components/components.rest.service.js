import {DEVELOPMENT} from "../../configurations/app-configurations";
import {ComponentsRestFakeBackend} from './components.rest.fake.backend';

const ComponentsRestServiceModule = angular.module('tt2ps.services.component.components-rest-service', []);
ComponentsRestServiceModule.factory('ComponentRestService', ComponentRestService);

ComponentRestService.$inject = ['$http'];

const COMPONENTS_ENDPOINT = '__about';

function ComponentRestService($http) {

  const _fakeBackend = new ComponentsRestFakeBackend();

  /**
   * Gets information about components used from application.
   *
   * @return {Promise<*>}
   */
  const getComponentInfo = () => {
    if (DEVELOPMENT) {
      return $http.get(COMPONENTS_ENDPOINT)
        .catch(() => {
          return _fakeBackend.getComponentInfo();
        });
    }
    return $http.get(COMPONENTS_ENDPOINT);
  };

  return {
    getComponentInfo,
  };
}

export default ComponentsRestServiceModule;
