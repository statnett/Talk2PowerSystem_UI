import './user-menu.directive.scss';
import template from './user-menu.directive.html';
import LogoutButtonModule from "../core/logout-button/logout-button";

const dependencies = [
    LogoutButtonModule.name
];
const UserMenuModule = angular.module('tt2ps.directives.user-menu', dependencies);

UserMenuModule.directive('userMenu', UserMenu);

UserMenu.$inject = ['SecurityContextService', '$document']

/**
 * @ngdoc directive
 * @name userMenu
 * @module tt2ps.directives.user-menu
 * @restrict E
 *
 * @description
 * The `userMenu` directive renders a user dropdown menu.
 * When the user is authenticated, it shows their name/username, and provides a dropdown
 * with options such as logout.
 *
 * @example
 * <user-menu></user-menu>
 */
function UserMenu(SecurityContextService, $document) {
    return {
        restrict: 'E',
        template,
        link: function ($scope) {

            // =========================
            // Public variables
            // =========================

            /**
             * The currently authenticated user, updated via SecurityContextService subscription.
             *
             * @type {UserModel|undefined}
             */
            $scope.authenticatedUser;

            /**
             * Whether the dropdown menu is currently open.
             *
             * @type {boolean}
             */
            $scope.menuOpen = false;

            // =========================
            // Private variables
            // =========================

            /**
             * Array of subscription functions to unsubscribe from when the directive is destroyed.
             * @type {*[]}
             */
            const subscriptions = [];

            // =========================
            // Public functions
            // =========================

            /**
             * Toggles the visibility of the user menu dropdown.
             */
            $scope.toggleMenu = () => {
                $scope.menuOpen = !$scope.menuOpen;
            }

            // =========================
            // Private functions
            // =========================

            /**
             * Updates the authenticated user.
             *
             * @param {UserModel|undefined} user - The updated authenticated user.
             */
            const onAuthenticatedUserChanged = (user) => {
                $scope.authenticatedUser = user;
            }

            /**
             * Handles global click events to close the menu when clicking outside the toggle.
             */
            const clickHandler = (event) => {
                if ($scope.menuOpen) {
                    // Skip if the click was on the toggle element
                    const isToggleClicked = event.target.closest('.user-menu-toggle') !== null;
                    if (!isToggleClicked) {
                        $scope.$apply(() => {
                            $scope.menuOpen = false;
                        });
                    }
                }
            };

            /**
             * Removes all active subscriptions and event listeners when the directive is destroyed.
             */
            const removeAllSubscribers = () => {
                subscriptions.forEach((subscription) => subscription());
                $document.off('click', clickHandler);
            };

            // =========================
            // Subscriptions
            // =========================

            $document.on('click', clickHandler);
            subscriptions.push(SecurityContextService.onAuthenticatedUserChanged(onAuthenticatedUserChanged));
            // Deregister the watcher when the scope/directive is destroyed
            $scope.$on('$destroy', removeAllSubscribers);
        }
    }
}

export default UserMenuModule;

