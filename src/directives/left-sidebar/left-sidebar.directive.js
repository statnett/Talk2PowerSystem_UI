import './left-sidebar.directive.scss';
import template from './left-sidebar.directive.html';

const dependencies = [];

const LeftSidebarModule = angular.module('tt2ps.directives.left-sidebar', dependencies);

LeftSidebarModule.directive('leftSidebar', LeftSidebar);

LeftSidebar.$inject = ['$location'];

/**
 * @ngdoc directive
 * @name leftSidebar
 * @module tt2ps.directives.left-sidebar
 * @restrict E
 *
 * @description
 * Renders the left sidebar of the application.
 *
 * The sidebar is a static template with optional dynamic content provided by child directives
 * (`<main-menu>` and `<questions>`). It is intended to be part of the page layout.
 *
 * @example
 * <left-sidebar></left-sidebar>
 */
function LeftSidebar() {
  return {
    restrict: 'E',
    template,
    link: function ($scope, element) {
    }
  };
}

export default LeftSidebarModule;
