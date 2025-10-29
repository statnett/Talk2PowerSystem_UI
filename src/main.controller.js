import angular from 'angular';
import ChatQuestionListModule from './directives/chat/chat-question-list/chat-question-list.directive';
import {AuthenticationState} from './models/security/authentication-state';

const dependencies = [ChatQuestionListModule.name];

const MainControllerModule = angular.module('tt2ps.controllers.mainCtrl', dependencies);

MainControllerModule.controller('mainCtrl', MainController);

MainController.$inject = ['$scope', '$location', 'SecurityContextService'];

function MainController($scope, $location, SecurityContextService) {
  // =========================
  // Public variables
  // =========================
  $scope.showMainMenu = false;

  // =========================
  // Private variables
  // =========================
  /**
   * Current security configuration.
   * @type {SecurityConfigurationModel|undefined}
   */
  let securityConfig;

  /**
   * Currently authenticated user.
   * @type {UserModel|undefined}
   */
  let authenticatedUser;

  /**
   * Array of subscription functions to unsubscribe from when the header is destroyed.
   * @type {Function[]}
   */
  const subscriptions = [];

  // =========================
  // Private functions
  // =========================
  /**
   * Handles updates to the security configuration.
   * @param {SecurityConfigurationModel} securityConfiguration - The updated security configuration.
   */
  const onSecurityConfigurationChanged = (securityConfiguration) => {
    securityConfig = securityConfiguration;
    updateMainMenuVisibility();
  };

  /**
   * Handles updates to the authenticated user.
   * @param {UserModel} user - The updated authenticated user.
   */
  const onAuthenticatedUserChanged = (user) => {
    authenticatedUser = user;
    updateMainMenuVisibility();
  };

  const onAuthenticationStateChanged = (newConfigurationState) => {
    if (newConfigurationState === AuthenticationState.NOT_AUTHENTICATED) {
      $location.path('/login');
    }
  };

  const updateMainMenuVisibility = () => {
    $scope.showMainMenu = securityConfig && (!securityConfig.enabled || authenticatedUser);
  }

  /**
   * Removes all registered subscriptions.
   */
  const removeAllSubscribers = () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
  };

  // =========================
  // Subscriptions
  // =========================
  subscriptions.push(SecurityContextService.onSecurityConfigurationChanged(onSecurityConfigurationChanged));
  subscriptions.push(SecurityContextService.onAuthenticatedUserChanged(onAuthenticatedUserChanged));
  subscriptions.push(SecurityContextService.onAuthenticationStateChanged(onAuthenticationStateChanged));

  // Deregister the watcher when the scope/directive is destroyed
  $scope.$on('$destroy', removeAllSubscribers);
}

export default MainControllerModule;
