import './dependencies.directive.scss';
import template from './dependencies.directive.html';

const DependenciesModule = angular.module('tt2ps.directives.components.dependencies', []);

DependenciesModule.directive('dependencies', DependenciesDirective);

DependenciesDirective.$inject = [];


/**
 * @name dependencies
 * @restrict E
 * @scope
 * @description
 * The `dependencies` directive displays a list of package dependencies. It supports customization of the table header label
 * and accepts dependency data through two-way binding.
 *
 * @example
 * <dependencies
 *   dependency-name-header="Package Dependencies"
 *   list-dependencies="dependencies">
 * </dependencies>
 */
function DependenciesDirective() {
  return {
    template,
    restrict: 'E',
    transclude: true,
    scope: {
      dependencyNameHeader: '@',
      listDependencies: '='
    },
    link: function ($scope) {}
  };
}

export default DependenciesModule;
