import './token-usage-popover.directive.scss';
import template from './token-usage-popover.directive.html';
import tippy from 'tippy.js';
import 'tippy.js/themes/light-border.css';

const TokensUsageInfoModule = angular.module('tt2ps.directives.chat.tokens-usage-info', [])
    .directive('tokensUsageInfo', TokensUsageInfoDirective)

TokensUsageInfoDirective.$inject = ['$compile'];

/**
 * @ngdoc directive
 * @name tt2ps.directives.chat.tokens-usage-info:TokensUsageInfoDirective
 * @restrict E
 * @description
 *
 * This directive represents a popover that displays a tokens usage information.
 *
 * @example
 * <div tokens-usage-info tokens-data="tokenUsageInfo"></div>
 */
function TokensUsageInfoDirective($compile) {
    return {
        restrict: 'A',
        scope: {
            tokensData: '='
        },
        link: function (scope, element) {
            const tooltipContentEl = $compile(template)(scope)[0];
            tippy(element[0], {
                content: tooltipContentEl,
                allowHTML: true,
                interactive: true,
                theme: 'light-border',
                placement: 'right-start',
                trigger: 'mouseenter',
            });
        }
    };
}

export default TokensUsageInfoModule;
