const DiagramRestServiceModule = angular.module('tt2ps.services.diagram-rest-service', []);
DiagramRestServiceModule.factory('DiagramRestService', DiagramRestService);

DiagramRestService.$inject = ['$http'];

function DiagramRestService($http) {

  const loadImage = (url) => {
    return $http.get(url, {responseType: 'blob'})
      .then(res => {
        return res;
      });
  };

  return {
    loadImage
  }
}

export default DiagramRestServiceModule;
