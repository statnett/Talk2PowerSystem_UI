import './main-menu-item.directive.scss';
import template from './maim-menu-item.directive.html';

const MainMenuItemModule = angular.module('tt2ps.directives.main-menu-item', []);

MainMenuItemModule.directive('mainMenuItem', MainMenuItem);

MainMenuItem.$inject = ['$location']

/**
 * @name main-menu-item
 * @module tt2ps.directives.main-menu-item
 * @restrict E
 *
 * @description
 * The `mainMenuItem` directive displays a single clickable menu entry with an icon and label.
 * When clicked, it navigates to the specified URL.
 *
 * @example
 * ```html
 * <main-menu-item
 *   icon-class="fa fa-home"
 *   label="Home"
 *   url="/home">
 * </main-menu-item>
 * ```
 */
function MainMenuItem($location) {
  return {
    restrict: 'E',
    template,
    scope: {
      iconClass: '@',
      label: '@',
      url: '@'
    },
    link: function ($scope) {
      // =========================
      // Public functions
      // =========================
      $scope.onClick = () => {
        $location.url($scope.url);
      }
    }
  }
}

export default MainMenuItemModule;
