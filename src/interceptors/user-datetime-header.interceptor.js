import {DateUtils} from '../services/utils/date-utils';

const HEADER_X_USER_DATETIME = 'X-User-Datetime';
const UserDatetimeInterceptorModule = angular.module('tt2ps.interceptors.user-datetime', []);

UserDatetimeInterceptorModule.factory('UserDatetimeInterceptor', UserDatetimeInterceptor);

function UserDatetimeInterceptor() {
  return {
    request: function (config) {
      const headers = config.headers || {};
      headers[HEADER_X_USER_DATETIME] = DateUtils.getFormattedDateTime(new Date());
      config.headers = headers;
      return config;
    }
  }
}

export default UserDatetimeInterceptorModule;
