import './tt2ps-header.directive.scss';
import template from './tt2ps-header.directive.html';
import SecurityContextServiceModule from "../../services/security/security-context.service";
import UserMenuModule from "../user-menu/user-menu.directive";

const dependencies = [
    SecurityContextServiceModule.name,
    UserMenuModule.name
];
const HeaderModule = angular.module('tt2ps.components.header', dependencies);

HeaderModule.directive('tt2psHeader', Tt2psHeaderDirective);

Tt2psHeaderDirective.$inject = ['SecurityContextService'];

/**
 * Directive for rendering the TT2PS header.
 */
function Tt2psHeaderDirective(SecurityContextService) {
    return {
        restrict: 'E',
        template,
        link: ($scope) => {

            // =========================
            // Public variables
            // =========================

            /**
             * Determines whether the user menu should be displayed.
             * @type {boolean}
             */
            $scope.showUserMenu = false;

            // =========================
            // Private variables
            // =========================

            /**
             * Current security configuration.
             * @type {SecurityConfigurationModel|undefined}
             */
            let securityConfig = undefined;

            /**
             * Currently authenticated user.
             * @type {UserModel|undefined}
             */
            let authenticatedUser = undefined;

            /**
             * Array of subscription functions to unsubscribe from when the header is destroyed.
             * @type {*[]}
             */
            const subscriptions = [];

            // =========================
            // Private functions
            // =========================

            /**
             * Initializes the directive.
             */
            const init = () => {
                updateShowUserMenu();
            }

            /**
             * Updates `$scope.showUserMenu` based on the current security configuration and user.
             */
            const updateShowUserMenu = () => {
                $scope.showUserMenu = securityConfig && securityConfig.enabled && authenticatedUser;
            }

            /**
             * Handles updates to the security configuration.
             * @param {SecurityConfigurationModel} securityConfiguration - The updated security configuration.
             */
            const onSecurityConfigurationChanged = (securityConfiguration) => {
                securityConfig = securityConfiguration;
                updateShowUserMenu();
            }

            /**
             * Handles updates to the authenticated user.
             * @param {UserModel} user - The updated authenticated user.
             */
            const onAuthenticatedUserChanged = (user) => {
                authenticatedUser = user;
                updateShowUserMenu();
            }

            /**
             * Removes all registered subscriptions.
             */
            const removeAllSubscribers = () => {
                subscriptions.forEach((subscription) => subscription());
            };

            // =========================
            // Subscriptions
            // =========================

            subscriptions.push(SecurityContextService.onSecurityConfigurationChanged(onSecurityConfigurationChanged));
            subscriptions.push(SecurityContextService.onAuthenticatedUserChanged(onAuthenticatedUserChanged));

            // Deregister the watcher when the scope/directive is destroyed
            $scope.$on('$destroy', removeAllSubscribers);

            // =========================
            // Initialization
            // =========================
            init();
        },
    };
}

export default HeaderModule;
