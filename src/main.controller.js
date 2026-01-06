import './layout.scss';
import angular from 'angular';
import QuestionListModule from './directives/question-list/question-list.directive';
import {AuthenticationState} from './models/security/authentication-state';
import QuestionsContextServiceModule from "./services/questions/question-context.service";
import QuestionsServiceModule from "./services/questions/questions.service";
import {QuestionCategoryListModel} from "./models/questions/question-category-list";

const dependencies = [
  QuestionListModule.name,
  QuestionsContextServiceModule.name,
  QuestionsServiceModule.name,
];

const MainControllerModule = angular.module('tt2ps.controllers.mainCtrl', dependencies);

MainControllerModule.controller('mainCtrl', MainController);

MainController.$inject = [
  '$scope',
  '$location',
  'SecurityContextService',
  'QuestionsService',
  'QuestionsContextService'];

function MainController($scope, $location, SecurityContextService, QuestionsService, QuestionsContextService) {
  // =========================
  // Public variables
  // =========================
  $scope.showLeftSidebar = false;
  $scope.isMobile = false;
  $scope.widths = {
    expanded: '20rem',
    collapsed: '4rem'
  };
  $scope.pinned = true;
  $scope.hover = false;

  // =========================
  // Public functions
  // =========================
  /**
   * Determines if the left sidebar has to be expanded.
   */
  $scope.isExpanded = () => {
    if ($scope.isMobile) {
      return $scope.pinned;
    }
    return $scope.pinned || $scope.hover;
  };

  $scope.hovering = (hovered) => {
    if ($scope.isMobile) {
      return;
    }
    $scope.hover = hovered;
  };

  $scope.togglePin = () => {
    $scope.pinned = !$scope.pinned;
    if ($scope.pinned) $scope.hover = false;
  };

  $scope.marginLeft = () => {
    if ($scope.isMobile) {
      return "0";
    }
    return $scope.pinned ? $scope.widths.expanded : $scope.widths.collapsed;
  };

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
  const init = () => {
    loadQuestions();
    updateIsMobile();
  }

  /**
   * Loads available questions.
   *
   */
  const loadQuestions = () => {
    QuestionsService.getQuestions()
        .then((questions) => {
          QuestionsContextService.setQuestions(questions);
        });
  };

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
    $scope.showLeftSidebar = securityConfig && (!securityConfig.enabled || authenticatedUser);
  }

  const onResize = () => {
    $scope.$apply(updateIsMobile);
  }

  const updateIsMobile = () => {
    const wasMobile = $scope.isMobile;

    $scope.isMobile = window.innerWidth <= 768 || /Mobi|Android|iPhone/i.test(navigator.userAgent);

    // If switched TO mobile mode → auto-collapse
    if ($scope.isMobile && !wasMobile) {
      $scope.pinned = false;
      $scope.hover = false;
    }

    // If switched FROM mobile to desktop → restore pinned behavior
    if (!$scope.isMobile && wasMobile) {
      $scope.pinned = true;
    }
  }

  /**
   * Removes all registered subscriptions.
   */
  const removeAllSubscribers = () => {
    subscriptions.forEach((unsubscribe) => unsubscribe());
    QuestionsContextService.setQuestions(new QuestionCategoryListModel());
    window.removeEventListener('resize', onResize);
  };

  // =========================
  // Subscriptions
  // =========================
  window.addEventListener('resize', onResize);
  subscriptions.push(SecurityContextService.onSecurityConfigurationChanged(onSecurityConfigurationChanged));
  subscriptions.push(SecurityContextService.onAuthenticatedUserChanged(onAuthenticatedUserChanged));
  subscriptions.push(SecurityContextService.onAuthenticationStateChanged(onAuthenticationStateChanged));

  // Deregister the watcher when the scope/directive is destroyed
  $scope.$on('$destroy', removeAllSubscribers);

  init();
}

export default MainControllerModule;
