import './property-html.directive.scss';
import template from './property-html.directive.html';

const dependencies = [];
const PropertyHtmlModule = angular.module('tt2ps.directives.core.property-html', dependencies);

PropertyHtmlModule.directive('propertyHtml', PropertyHtmlDirective);

PropertyHtmlDirective.$inject = ['$sce'];

/**
 * @name property-html
 * @restrict E
 * @scope
 * @description
 * The `property-html` directive renders a single property entry as a label–html pair.
 *
 * @example
 * <property-html label-key="Version" value="<span>1.0.0</span>"></property-html>
 */
function PropertyHtmlDirective($sce) {
  return {
    template,
    restrict: 'E',
    scope: {
    labelKey: '@',
    value: '@'
    },
    link: function ($scope) {
      // =========================
      // Private variables
      // =========================
      let valueChangeSubscription;

      // =========================
      // Subscriptions
      // =========================
      valueChangeSubscription = $scope.$watch('value', (newVal) => {
        $scope.trustedHtml = $sce.trustAsHtml(newVal);
      });

      $scope.$on('$destroy', () => valueChangeSubscription());
    }
  }
}

export default PropertyHtmlModule;
