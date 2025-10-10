import './backend.directive.scss';
import template from './backend.directive.html';
import {BackendModel} from '../../../models/components/backend';
import PropertyModule from '../../core/property/property.directive';
import DependenciesModule from '../dependencies/dependencies.directive';
import PropertyInputModule from '../../core/property-input/property-input.directive';

const dependencies = [
  PropertyModule.name,
  PropertyInputModule.name,
  DependenciesModule.name
];
const BackendModule = angular.module('tt2ps.directives.components.backend', dependencies);

BackendModule.directive('backend', BackendDirective);

BackendDirective.$inject = ['ComponentsContextService'];


/**
 * @name backend
 * @restrict E
 * @scope
 * @description
 * The `backend` directive displays backend information.
 *
 * @example
 * <backend></backend>
 */
function BackendDirective(ComponentsContextService) {
  return {
    template,
    restrict: 'E',
    scope: {},
    link: function ($scope) {
      // =========================
      // Public variables
      // =========================
      /**
       * @type {BackendModel}
       */
      $scope.backend = new BackendModel();

      // =========================
      // Private variables
      // =========================
      const subscriptions = [];

      // =========================
      // Private functions
      // =========================
      const onComponentsInfoChanged = (componentsInfo) => {
        $scope.backend = componentsInfo.backend;
      }

      const removeAllSubscriptions = () => {
        subscriptions.forEach(unsubscribe => unsubscribe());
      }

      // =========================
      // Subscriptions
      // =========================
      subscriptions.push(ComponentsContextService.onComponentsInfoChanged(onComponentsInfoChanged));

      $scope.$on('$destroy', removeAllSubscriptions);
    }
  };
}

export default BackendModule;
