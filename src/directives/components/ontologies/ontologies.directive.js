import './ontologies.directive.scss';
import template from './ontologies.directive.html';
import {OntologyModel} from '../../../models/components/ontology';

const OntologiesModule = angular.module('tt2ps.directives.components.ontologies', []);

OntologiesModule.directive('ontologies', OntologiesDirective);

OntologiesDirective.$inject = ['ComponentsContextService'];


/**
 * @name ontologies
 * @restrict E
 * @scope
 * @description
 * The `ontologies` directive displays ontology data such as name, version, and last update date.
 *
 * @example
 * <ontologies></ontologies>
 */
function OntologiesDirective(ComponentsContextService) {
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
       * @type {OntologyModel[]}
       */
      $scope.ontologies = [];

      // =========================
      // Private variables
      // =========================
      const subscriptions = [];

      // =========================
      // Private functions
      // =========================
      const onComponentsInfoChanged = (componentsInfo) => {
        $scope.ontologies = componentsInfo.ontologies;
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

export default OntologiesModule;
