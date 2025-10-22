import './frontend.directive.scss'
import template from './frontend.directive.html';
import DependenciesModule from '../dependencies/dependencies.directive';
import {FrontendModel} from '../../../models/components/frontend';

const dependencies = [
  DependenciesModule.name
];
const FrontendModule = angular.module('tt2ps.directives.components.frontend', dependencies);

FrontendModule.directive('frontend', FrontendDirective);

FrontendDirective.$inject = ['ComponentsContextService'];


/**
 * @ngdoc directive
 * @name frontend
 * @restrict E
 * @scope
 * @description
 * The `frontend` directive displays information about the frontend, such as the framework, javascript runtime and package dependencies.
 *
 * @example
 * <frontend></frontend>
 */
function FrontendDirective(ComponentsContextService) {
  return {
    template,
    restrict: 'E',
    scope: {},
    link: function ($scope) {
      // =========================
      // Public variables
      // =========================
      /**
       * @type {FrontendModel}
       */
      $scope.frontend = new FrontendModel();

      // =========================
      // Private variables
      // =========================
      const subscriptions = [];

      // =========================
      // Private functions
      // =========================
      const onComponentsInfoChanged = (componentsInfo) => {
        $scope.frontend = componentsInfo.frontend;
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

export default FrontendModule;
