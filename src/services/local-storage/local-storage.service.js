const LocalStorageServiceModule = angular.module('tt2ps.services.local-storage-service', []);
LocalStorageServiceModule.factory('LocalStorageService', LocalStorageService);

LocalStorageService.$inject = ['$window'];

/**
 * LocalStorage service wrapper.
 * Provides simple access to browser localStorage.
 */
function LocalStorageService($window) {

    /**
     * Retrieves a value from localStorage.
     *
     * @param {string} key LocalStorage key.
     * @param {string} [defaultValue] Value returned if the key does not exist.
     * @returns {string|null} Stored value or default value.
     */
    const get = (key, defaultValue) => {
        return $window.localStorage.getItem(key) || defaultValue;
    }

    /**
     * Stores a value in localStorage.
     *
     * @param {string} key LocalStorage key.
     * @param {string} value Value to store.
     */
    const set = (key, value) => {
        $window.localStorage.setItem(key, value);
    }

    return {
        get,
        set
    };
}

export default LocalStorageServiceModule;
