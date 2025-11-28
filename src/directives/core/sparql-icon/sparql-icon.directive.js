import './sparql-icon.directive.scss';
import template from './sparql-icon.directive.html';

const dependencies = [];
const IconsModule = angular.module('tt2ps.directives.core.icons', dependencies);

IconsModule.directive('sparqlIcon', SPARQLIconDirective);

SPARQLIconDirective.$inject = [];

/**
 * @ngdoc directive
 * @name sparqlIcon
 * @module tt2ps.directives.core.icons
 * @restrict E
 *
 * @description
 * Displays a SPARQL-style icon composed of braces and an ellipsis.
 * This is a purely visual component using RemixIcon classes.
 *
 * @example
 * <sparql-icon></sparql-icon>
 *
 * The rendered HTML:
 * <span class="sparql-icon">
 *   <i class="ri-braces-line ri-1x left-brace"></i>
 *   <i class="ri-more-line ellipsis"></i>
 *   <i class="ri-braces-line ri-1x right-brace"></i>
 * </span>
 *
 * @usageNotes
 * - Requires RemixIcon CSS to display icons correctly.
 * - No isolate scope or controller logic needed.
 */
function SPARQLIconDirective() {
  return {
    restrict: "E",
    template
  };
}

export default IconsModule;
