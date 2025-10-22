import {cloneDeep} from 'lodash';
import {TT2PSEventName} from "../../models/tt2ps-event-name";

const ComponentsContextServiceModule = angular.module('tt2ps.services.components-context-service', []);
ComponentsContextServiceModule.factory('ComponentsContextService', ComponentsContextService);

ComponentsContextService.$inject = ['EventEmitterService'];


function ComponentsContextService(EventEmitterService) {

  /**
   * @type {ComponentsInfoModel|undefined}
   */
  let _componentsInfo = undefined;

  /**
   * Return the application components information.
   * @return {ComponentsInfoModel|undefined}
   */
  const getComponentsInfo = () => {
    return cloneDeep(_componentsInfo);
  }

  /**
   * Updates the application components information and emits the 'componentsInfoChanged' event to notify listeners that
   * the application components information has changed.
   *
   * @param {ComponentsInfoModel|undefined} componentsInfo - The application components information that is being updated.
   */
  const updateComponentsInfo = (componentsInfo) => {
    _componentsInfo = cloneDeep(componentsInfo);
    emit(TT2PSEventName.COMPONENTS_INFO_CHANGED, getComponentsInfo());
  };

  /**
   * Subscribes to the 'componentsInfoChanged' event.
   * @param {function} callback - The callback to be called when the event is fired.
   *
   * @return {function} unsubscribe function.
   */
  const onComponentsInfoChanged = (callback) => {
    if (_componentsInfo && angular.isFunction(callback)) {
      callback(getComponentsInfo());
    }
    return subscribe(TT2PSEventName.COMPONENTS_INFO_CHANGED, (chats) => callback(chats));
  }

  /**
   * Emits an event with a deep-cloned payload using the EventEmitterService.
   *
   * @param {string} tT2PSEventName - The name of the event to emit. It must be a value from {@link TT2PSEventName}.
   * @param {*} payload - The data to emit with the event. The payload is deep-cloned before emission.
   */
  const emit = (tT2PSEventName, payload) => {
    EventEmitterService.emitSync(tT2PSEventName, cloneDeep(payload));
  };

  /**
   * Subscribes to an event with the specified callback using the EventEmitterService.
   *
   * @param {string} tT2PSEventName - The name of the event to subscribe to. It must be a value from {@link TT2PSEventName}.
   * @param {function} callback - The function to call when the event is emitted.
   * @return {function} - Returns a function that can be called to unsubscribe from the event.
   */
  const subscribe = (tT2PSEventName, callback) => {
    return EventEmitterService.subscribeSync(tT2PSEventName, (payload) => callback(payload));
  };

  return {
    emit,
    subscribe,
    getComponentsInfo,
    updateComponentsInfo,
    onComponentsInfoChanged
  }
}

export default ComponentsContextServiceModule;
