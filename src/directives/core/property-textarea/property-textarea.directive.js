import './property-textarea.directive.scss';
import template from './property-textarea.directive.html';

const dependencies = [];
const PropertyTextareaModule = angular.module('tt2ps.directives.core.property-textarea', dependencies);

PropertyTextareaModule.directive('propertyTextarea', PropertyTextareaDirective);

PropertyTextareaDirective.$inject = [];

/**
 * @name property-textarea
 * @restrict E
 * @scope
 * @description
 * The `property-textarea` directive renders a single property entry as a label–textarea pair.
 *
 * @example
 * <property-textarea label-key="Version" value="1.0.0"></property-textarea>
 */
function PropertyTextareaDirective() {
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


export default PropertyTextareaModule;
