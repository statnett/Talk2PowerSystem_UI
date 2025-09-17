import template from './login-button.html';
import AuthenticationModule from "../../../services/security/authentication.service";
import {UserModel} from "../../../models/security/user";
import {AuthenticationState} from "../../../models/security/authentication-state";

const dependencies = [
    AuthenticationModule.name
];
const LoginButtonModule = angular.module('tt2ps.directives.core.logout-button', dependencies);

LoginButtonModule.directive('loginButton', LoginButtonDirective);

LoginButtonDirective.$inject = ['$translate', 'ToastrService', 'SecurityContextService', 'AuthenticationService']

/**
 * Directive for rendering a login button. When clicked, it triggers the authentication process.
 */
function LoginButtonDirective($translate, ToastrService, SecurityContextService, AuthenticationService) {
    return {
        restrict: 'E',
        template,
        scope: {},
        link: function (scope) {

            // =========================
            // Public functions
            // =========================
            scope.login = () => {
                AuthenticationService.login()
                    .then(updateAuthenticatedUser)
                    .catch((err) => {
                        const errorLabelKey = `tt2ps.login-errors.${err.errorCode}`;
                        const errorMessage = $translate.instant(errorLabelKey);
                        if (errorMessage !== errorLabelKey) {
                            ToastrService.error(errorMessage);
                        } else {
                            ToastrService.error(err.message || err.errorMessage);
                        }
                        SecurityContextService.updateAuthenticationState(AuthenticationState.NOT_AUTHENTICATED);
                        throw err;
                    })
            }

            // =========================
            // Private functions
            // =========================
            const updateAuthenticatedUser = (activeUserAccount) => {
                const user = new UserModel({
                    username: activeUserAccount.username,
                    name: activeUserAccount.name
                });
                SecurityContextService.updateAuthenticatedUser(user);
            }
        }
    }
}

export default LoginButtonModule;

