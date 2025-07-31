import './markdown-content.directive.scss';
import template from './markdown-content.directive.html';
import MarkdownServiceModule from "../../../services/markdown/markdown.service";

const modules = [
    MarkdownServiceModule.name
];

const MarkdownContentModule = angular
    .module('tt2ps.directives.core.markdown-content', modules);

MarkdownContentModule
    .directive('markdownContent', markdownContentDirective);

markdownContentDirective.$inject = ['$compile', 'MarkdownService'];

/**
 * @ngdoc directive
 * @name tt2ps.directives.core.markdown-content:markdownContentDirective
 * @restrict E
 *
 * @description
 * The `markdownContent` directive is used to render and compile Markdown content inside AngularJS applications.
 * It dynamically compiles any AngularJS directives within the rendered Markdown content, ensuring that the
 * directives are properly recognized and executed.
 *
 * @param {string=} content The markdown content to be rendered. This can be passed dynamically from the scope.
 * @param {object=} options Optional configuration object to pass to the Markdown rendering engine, providing
 * customization for how the Markdown is rendered.
 *
 * @example
 * Usage:
 * <markdown-content content="markdownText" options="markdownOptions"></markdown-content>
 */
function markdownContentDirective($compile, MarkdownService) {
    return {
        template,
        restrict: 'E',
        scope: {
            content: '@',
            options: '='
        },
        link: function ($scope, element) {

            // =========================
            // Public variables
            // =========================

            /**
             * The rendered HTML content generated from the provided Markdown.
             *
             * @type {string} markdownContent
             */
            $scope.markdownContent = undefined;

            // =========================
            // Private functions
            // =========================

            const init = () => {
                $scope.markdownContent = MarkdownService.renderMarkdown($scope.content, $scope.options);
                compileMarkdownAnswerContents();
            };

            /**
             * Manually compiles AngularJS directives within the dynamically generated markdown HTML content.
             * AngularJS does not automatically detect and compile directives inside HTML that is dynamically
             * inserted, so this function ensures that the content is compiled after it is rendered.
             */
            const compileMarkdownAnswerContents = () => {
                $scope.$evalAsync(() => {
                    // Find the dynamically rendered element that needs to be compiled
                    const markdownElement = element.find('.markdown-content');
                    $compile(angular.element(markdownElement).contents())($scope);
                });
            };

            init();
        }
    };
}

export default MarkdownContentModule;
