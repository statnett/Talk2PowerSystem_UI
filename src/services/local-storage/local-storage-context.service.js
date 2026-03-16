import {cloneDeep} from 'lodash';
import {TT2PSEventName} from "../../models/tt2ps-event-name";
import LocalStorageServiceModule from "./local-storage.service";
import {LOCAL_STORAGE_KEY} from "../../models/local-storage/local-storage-key";

const dependencies = [
    LocalStorageServiceModule.name
];

const LocalStorageContextServiceModule = angular.module('tt2ps.services.local-storage-context-service', dependencies);

LocalStorageContextServiceModule.factory('LocalStorageContextService', LocalStorageContextService);

LocalStorageContextService.$inject = ['$window', '$rootScope', 'EventEmitterService', 'LocalStorageService'];

function LocalStorageContextService($window, $rootScope, EventEmitterService, LocalStorageService) {

    /**
     * Initializes the service.
     * Registers listeners required for cross-tab synchronization.
     * @private
     */
    const _init = () => {
        _registerExplainResponseModeStorageListener();
    };

    /**
     * Returns the explain response advanced mode flag.
     *
     * @return {boolean} explainResponseAdvancedMode Flag indicating whether the explain response advanced mode is enabled.
     */
    const getExplainResponseAdvancedMode = () => {
        return LocalStorageService.get(LOCAL_STORAGE_KEY.EXPLAIN_RESPONSE_MODE) === 'true';
    };

    /**
     * Updates the explain response advanced mode flag and emits an event notifying listeners that the value has changed.
     *
     * @param {boolean} explainResponseAdvancedMode Flag indicating whether the explain response advanced mode is enabled.
     */
    const updateExplainResponseAdvancedMode = (explainResponseAdvancedMode) => {
        LocalStorageService.set(LOCAL_STORAGE_KEY.EXPLAIN_RESPONSE_MODE, explainResponseAdvancedMode);
        _notifyExplainResponseAdvancedModeChanged();
    };

    /**
     * Subscribes to the explain response advanced mode change event. The callback is immediately invoked with
     * the current value.
     *
     * @param {function(boolean):void} callback Callback invoked when the value changes.
     * @return {function} Function that unsubscribes the listener.
     */
    const onExplainResponseAdvancedModeChanged = (callback) => {
        if (angular.isFunction(callback)) {
            callback(getExplainResponseAdvancedMode());
        }

        return subscribe(TT2PSEventName.EXPLAIN_RESPONSE_ADVANCED_MODE_CHANGED, (mode) => callback(mode));
    };

    /**
     * Emits an application event using EventEmitterService with a deep-cloned payload.
     *
     * @param {string} tT2PSEventName Event name defined in {@link TT2PSEventName}.
     * @param {*} payload Payload to emit with the event.
     */
    const emit = (tT2PSEventName, payload) => {
        EventEmitterService.emitSync(tT2PSEventName, cloneDeep(payload));
    };

    /**
     * Subscribes to an application event.
     *
     * @param {string} tT2PSEventName Event name defined in {@link TT2PSEventName}.
     * @param {function(*):void} callback Function invoked when the event is emitted.
     * @return {function} Function used to unsubscribe from the event.
     */
    const subscribe = (tT2PSEventName, callback) => {
        return EventEmitterService.subscribeSync(tT2PSEventName, (payload) => callback(payload));
    };

    /**
     * Emits an event indicating that the explain response advanced mode has changed.
     *
     * @private
     */
    const _notifyExplainResponseAdvancedModeChanged = () => {
        emit(TT2PSEventName.EXPLAIN_RESPONSE_ADVANCED_MODE_CHANGED, getExplainResponseAdvancedMode());
    };

    /**
     * Registers a browser storage event listener to detect updates to the explain response advanced mode key
     * from other browser tabs.
     *
     * @private
     */
    const _registerExplainResponseModeStorageListener = () => {
        $window.addEventListener('storage', (event) => {
            if (LOCAL_STORAGE_KEY.EXPLAIN_RESPONSE_MODE === event.key) {
                $rootScope.$applyAsync(function () {
                    _notifyExplainResponseAdvancedModeChanged();
                });
            }
        });
    };

    _init();

    return {
        emit,
        subscribe,
        getExplainResponseAdvancedMode,
        updateExplainResponseAdvancedMode,
        onExplainResponseAdvancedModeChanged
    };
}

export default LocalStorageContextServiceModule;