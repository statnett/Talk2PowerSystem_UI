import './datasets.directive.scss';
import template from './datasets.directive.html';
import {DatasetModel} from '../../../models/components/dataset';

const DatasetsModule = angular.module('tt2ps.directives.components.datasets', []);

DatasetsModule.directive('datasets', DatasetsDirective);

DatasetsDirective.$inject = ['ComponentsContextService'];


/**
 * @name datasets
 * @restrict E
 * @scope
 * @description
 * The `datasets` directive displays datasets data such as name, and last update date.
 *
 * @example
 * <datasets></datasets>
 */
function DatasetsDirective(ComponentsContextService) {
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
       * @type {DatasetModel[]}
       */
      $scope.datasets = [];

      // =========================
      // Private variables
      // =========================
      const subscriptions = [];

      // =========================
      // Private functions
      // =========================
      const onComponentsInfoChanged = (componentsInfo) => {
        $scope.datasets = componentsInfo.datasets;
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

export default DatasetsModule;
