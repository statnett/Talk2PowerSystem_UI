const UnauthorizedInterceptorModule = angular.module('tt2ps.interceptors.unauthorized', []);
UnauthorizedInterceptorModule.factory('UnauthorizedInterceptor', UnauthorizedInterceptor);

UnauthorizedInterceptor.$inject = ['$q', '$location'];

/**
 * Intercepts $http responses and redirects to the login page if a 401 error occurs.
 */
function UnauthorizedInterceptor($q, $location) {
    return {
        'responseError': function(response) {
            if (response.status === 401) {
                $location.path('login');
            }
            return $q.reject(response);
        }
    };
}

export default UnauthorizedInterceptorModule;
