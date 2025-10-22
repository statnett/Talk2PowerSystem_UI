import './graphdb.directive.scss';
import template from './graphdb.directive.html';
import {GraphDBModel} from '../../../models/components/graphdb';
import PropertyModule from '../../core/property/property.directive';
import PropertyInputModule from '../../core/property-input/property-input.directive';
import PropertyHtmlModule from '../../core/property-html/property-html.directive';


const dependencies = [
  PropertyModule.name,
  PropertyInputModule.name,
  PropertyHtmlModule.name
];
const GraphDBModule = angular.module('tt2ps.directives.components.graphdb', dependencies);

GraphDBModule.directive('graphdb', GraphDBDirective);

GraphDBDirective.$inject = ['ComponentsContextService'];


/**
 * @name graphdb
 * @restrict E
 * @scope
 * @description
 * The `graphdb` directive displays graphdb instance information.
 *
 * @example
 * <graphdb></frontend>
 */
function GraphDBDirective(ComponentsContextService) {
  return {
    template,
    restrict: 'E',
    transclude: true,
    scope: {},
    link: function ($scope) {
      // =========================
      // Public variables
      // =========================
      /**
       * @type {GraphDBModel}
       */
      $scope.graphdb = new GraphDBModel();

      // =========================
      // Private variables
      // =========================
      const subscriptions = [];

      // =========================
      // Private functions
      // =========================
      const onComponentsInfoChanged = (componentsInfo) => {
        $scope.graphdb = componentsInfo.graphdb;
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

export default GraphDBModule;
