import './main-menu.directive.scss';
import template from './main-menu.directive.html';
import MainMenuItemModule from './main-menu-item/main-menu-item.directive';
import routes from '../../routes';

const dependencies = [
  MainMenuItemModule.name
]

const MainMenuModule = angular.module('tt2ps.directives.main-menu', dependencies);

MainMenuModule.directive('mainMenu', MainMenu);

MainMenu.$inject = ['$location']

/**
 * @name main-menu
 * @module tt2ps.directives.main-menu
 * @restrict E
 *
 * @description
 * The `mainMenu` directive provides a collapsible main navigation menu for the application.
 * It loads available routes, renders menu items (using `mainMenuItem`), and tracks which
 * route is currently active. It also provides functionality to collapse or expand the menu.
 *
 * @example
 * ```html
 * <main-menu></main-menu>
 * ```
 */
function MainMenu($location) {
  return {
    restrict: 'E',
    template,
    link: function ($scope) {
      // =========================
      // Public functions
      // =========================
      $scope.toggleMainMenu = () => {
        const mainMenu = document.querySelector('.main-menu');
        mainMenu.classList.toggle('collapsed');
      };

      $scope.isActive = (path) => {
        return $location.path() === path;
      }

      // =========================
      // Private functions
      // =========================
      const init = () => {
        $scope.routes = routes.filter((route) => route.labelKey)
      }

      init();
    }
  }
}

export default MainMenuModule;
