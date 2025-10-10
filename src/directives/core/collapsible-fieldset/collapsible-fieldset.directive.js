import './collapsible-fieldset.directive.scss';
import template from './collapsible-fieldset.directive.html';

const CollapsibleFieldsetModule = angular.module('tt2ps.directives.core.collapsible-fieldset.collapsible-fieldset', []);

CollapsibleFieldsetModule.directive('collapsibleFieldset', CollapsibleFieldsetDirective);

CollapsibleFieldsetDirective.$inject = [];

/**
 * @name collapsible-fieldset
 * @restrict E
 * @description
 * A collapsible fieldset component that displays a fieldset and transcluded content.
 *
 * @example
 * <collapsible-fieldset fieldset-legend="Fieldset Legend">
 *   <p>This is the fieldset content.</p>
 * </collapsible-fieldset>
 */
function CollapsibleFieldsetDirective() {
  return {
    template,
    restrict: 'E',
    transclude: true,
    scope: {
      fieldsetLegend: '@',
      collapsed: '<?'
    },
    link: function ($scope) {
      // =========================
      // Public functions
      // =========================
      $scope.toggle = function() {
        $scope.collapsed = !$scope.collapsed;
      };

      // =========================
      // Private functions
      // =========================
      const init = () => {
        if (typeof $scope.collapsed === 'undefined') {
          $scope.collapsed = true;
        }
      };

      init();
    }
  };
}

export default CollapsibleFieldsetModule;
