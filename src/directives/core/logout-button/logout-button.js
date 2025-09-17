import './logout-button.scss';
import template from './logout-button.html';
import AuthenticationModule from "../../../services/security/authentication.service";

const dependencies = [
    AuthenticationModule.name
];
const LogoutButtonModule = angular.module('tt2ps.directives.core.logout-button', dependencies);

LogoutButtonModule.directive('logoutButton', LogoutButtonDirective);

LogoutButtonDirective.$inject = ['SecurityService', 'AuthenticationService']

/**
 * Directive for rendering a logout button. When clicked, it triggers the logout process.
 */
function LogoutButtonDirective(SecurityService, AuthenticationService) {
    return {
        restrict: 'E',
        template,
        link: function ($scope) {
            // =========================
            // Public functions
            // =========================

            $scope.logout = AuthenticationService.logout;
        }
    }
}

export default LogoutButtonModule;

