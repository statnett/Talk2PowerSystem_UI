import './collapsible-card.directive.scss';
import template from './collapsible-card.directive.html';

const CollapsibleCardModule = angular.module('tt2ps.directives.core.collapsible-card.collapsible-card', []);

CollapsibleCardModule.directive('collapsibleCard', CollapsibleCardDirective);

CollapsibleCardDirective.$inject = [];


/**
 * @name collapsibleCard
 * @restrict E
 * @description
 * A collapsible card component that displays a header (card title) and transcluded content.
 * The card can be expanded or collapsed by clicking on the header.
 *
 * @example
 * <collapsible-card card-title="Card Title">
 *   <p>This is the card content.</p>
 * </collapsible-card>
 */
function CollapsibleCardDirective() {
  return {
    template,
    restrict: 'E',
    transclude: true,
    scope: {
      cardTitle: '@',
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

export default CollapsibleCardModule;
