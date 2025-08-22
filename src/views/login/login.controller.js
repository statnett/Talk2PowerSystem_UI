import './login.scss';
import AuthenticationModule from "../../services/security/authentication.service";
import LoginButton from "../../directives/core/login-button/login-button";
import SecurityContextServiceModule from "../../services/security/security-context.service";
import {AuthenticationState} from "../../models/security/authentication-state";

const dependencies = [
    AuthenticationModule.name,
    LoginButton.name,
    SecurityContextServiceModule.name
];
const LoginModule = angular.module('tt2ps.controllers.login-ctrl', dependencies);

LoginModule.controller('loginCtrl', LoginCtrl);

LoginCtrl.$inject = [
    '$scope',
    'AuthenticationService',
    'SecurityContextService'
];

/**
 * Controller for the login view.
 */
function LoginCtrl($scope, AuthenticationService, SecurityContextService) {

    // =========================
    // Public variables
    // =========================

    /**
     * Current authentication state.
     * Can be one of `AuthenticationState.NOT_AUTHENTICATED`, `AuthenticationState.AUTHENTICATION_IN_PROGRESS`, or `AuthenticationState.AUTHENTICATED`.
     * @type {string}
     */
    $scope.authenticationState = AuthenticationState.NOT_AUTHENTICATED;

    /**
     * Flag indicating whether security is enabled.
     * @type {boolean}
     */
    $scope.isSecurityEnabled = false;

    // =========================
    // Private variables
    // =========================

    /**
     * Array of subscription functions to unsubscribe from when the header is destroyed.
     * @type {*[]}
     */
    const subscriptions = [];


    // =========================
    // Private functions
    // =========================
    const onAuthenticationStateChanged = (authenticationState) => {
        $scope.authenticationState = authenticationState;
    };

    const onSecurityConfigurationChanged = (securityConfiguration) => {
        $scope.isSecurityEnabled = securityConfiguration.enabled;
    };

    // =========================
    // Subscriptions
    // =========================
    subscriptions.push(SecurityContextService.onAuthenticationStateChanged(onAuthenticationStateChanged));
    subscriptions.push(SecurityContextService.onSecurityConfigurationChanged(onSecurityConfigurationChanged));

    $scope.$on('$destroy', () => subscriptions.forEach((subscription) => subscription()))
}

export default LoginModule;
