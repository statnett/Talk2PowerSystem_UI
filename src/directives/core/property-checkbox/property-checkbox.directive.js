import './property-checkbox.directive.scss';
import template from './property-chekcbox.directive.html';

const dependencies = [];
const PropertyCheckboxModule = angular.module('tt2ps.directives.core.property-checkbox', dependencies);

PropertyCheckboxModule.directive('propertyCheckbox', PropertyCheckboxDirective);

PropertyCheckboxDirective.$inject = [];

/**
 * @name property-checkbox
 * @restrict E
 * @scope
 * @description
 * The `property-checkbox` directive renders a single property entry as a label–checkbox pair.
 *
 * @example
 * <property-checkbox label-key="Version" value="true"></property-checkbox>
 */
function PropertyCheckboxDirective() {
  return {
    template,
    restrict: 'E',
    scope: {
    labelKey: '@',
    value: '@'
    },
    link: function ($scope) {
      $scope.checked = $scope.value === "true";
    }
  }
}


export default PropertyCheckboxModule;
