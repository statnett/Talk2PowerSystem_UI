import './property-input.directive.scss';
import template from './property-input.directive.html';

const dependencies = [];
const PropertyInputModule = angular.module('tt2ps.directives.core.property-input', dependencies);

PropertyInputModule.directive('propertyInput', PropertyInputDirective);

PropertyInputDirective.$inject = [];

/**
 * @name property-input
 * @restrict E
 * @scope
 * @description
 * The `property-input` directive renders a single property entry as a label–input pair.
 *
 * @example
 * <property-input label-key="Version" value="1.0.0"></property-input>
 */
function PropertyInputDirective() {
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


export default PropertyInputModule;
