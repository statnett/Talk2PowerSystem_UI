import './property.directive.scss';
import template from './property.directive.html';

const dependencies = [];
const PropertyModule = angular.module('tt2ps.directives.core.property', dependencies);

PropertyModule.directive('property', PropertyDirective);

PropertyDirective.$inject = [];

/**
 * @name property
 * @restrict E
 * @scope
 * @description
 * The `property` directive renders a single property entry as a label–value pair.
 *
 * @example
 * <property label-key="Version" value="1.0.0"></property>
 */
function PropertyDirective() {
  return {
    template,
    restrict: 'E',
    scope: {
    labelKey: '@',
    value: '@'
    },
    link: function ($scope) {}
  }
}


export default PropertyModule;
