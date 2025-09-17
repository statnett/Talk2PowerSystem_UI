import './copy-to-clipboard.directive.scss';
import template from './copy-to-clipboard.directive.html';

const CopyToClipboardModule = angular.module('tt2ps.directives.core.copy-to-clipboard.copy-to-clipboard', []);
CopyToClipboardModule.directive('copyToClipboard', CopyToClipboardDirective);

CopyToClipboardDirective.$inject = ['$translate', 'ToastrService'];

/**
 * @ngdoc directive
 * @name CopyToClipboardDirective
 * @module tt2ps.directives.core.copy-to-clipboard.copy-to-clipboard
 * @restrict E
 *
 * @description
 * `CopyToClipboard` is a directive that creates a button which, when clicked, copies a specific text to the clipboard.
 * The directive uses an isolated scope with multiple properties to support both default and custom styling behaviors.
 *
 * - By default, the button shows a translated tooltip on hover and triggers a copy to clipboard operation.
 * - In a custom behavior mode (enabled via `customTooltipStyle`), the directive suppresses the tooltip and instead displays a styled inline tooltip on click.
 * - The copy operation can be targeted to a specific element using `targetSelector`, useful when triggering the directive indirectly (e.g. clicking on a container).
 * - The success message via `toastr` can also be disabled if custom feedback is handled separately.
 *
 * @param {string} tooltipText - The text to be displayed as a tooltip when hovering over the button. One-time bound by default.
 * @param {string} textToCopy - (optional) The text to be copied. If not passed, the directive will search for an element with class `copyable` within the parent element.
 * @param {boolean} customTooltipStyle - (optional) If true, suppresses the default tooltip and shows a custom-styled tooltip near the icon on click.
 * @param {string} targetSelector - (optional) A CSS selector used to locate an external DOM element to which the tooltip should be anchored.
 * @param {string} customTooltipText - (optional) The text to display in the custom tooltip.
 *
 * @example
 * <!-- Default usage -->
 * <copy-to-clipboard tooltip-text="Your tooltip text here"></copy-to-clipboard>
 *
 * @example
 * <!-- With custom copy text -->
 * <copy-to-clipboard tooltip-text="'Click to copy'" text-to-copy="{{valueToCopy}}"></copy-to-clipboard>
 *
 * @example
 * <!-- With custom tooltip behavior and external target -->
 * <div class="item" id="itemId">
 *   <copy-to-clipboard
 *     text-to-copy="{{valueToCopy}}"
 *     custom-tooltip-style="true"
 *     ng-attr-target-selector="#itemId">
 *   </copy-to-clipboard>
 * </div>
 */
function CopyToClipboardDirective($translate, ToastrService) {
    return {
        template,
        restrict: 'E',
        scope: {
            tooltipText: '@',
            textToCopy: '@',
            customTooltipStyle: '@?',
            targetSelector: '@?',
            customTooltipText: '@?'
        },
        link: function ($scope, element) {

            // =========================
            // Public functions
            // =========================
            $scope.copyToClipboard = function () {
                const textToCopy = $scope.textToCopy ? $scope.textToCopy : element.parent().find('.copyable').text();

                if (navigator.clipboard) {
                    navigator.clipboard.writeText(textToCopy).then(() => {
                        showSuccessFeedback();
                    }).catch(err => {
                        console.error('Could not copy text: ', err);
                        fallbackCopy(textToCopy);
                    });
                } else {
                    fallbackCopy(textToCopy);
                }
            };

            // =========================
            // Private functions
            // =========================
            const showCustomTooltip = () => {
                const tooltip = document.createElement("span");
                tooltip.innerText = $scope.customTooltipText;
                tooltip.className = "custom-tooltip-popup";
                const iconElement = element[0].querySelector('.custom-link-icon');

                iconElement.appendChild(tooltip);

                requestAnimationFrame(() => {
                    tooltip.classList.add("show");
                });

                setTimeout(() => {
                    tooltip.classList.remove("show");
                    setTimeout(() => tooltip.remove(), 200);
                }, 1500);
            }

            const showSuccessFeedback = () => {
                if ($scope.customTooltipStyle) {
                    showCustomTooltip();
                } else {
                    ToastrService.success($translate.instant('copy_to_clipboard.messages.copied_to_clipboard'));
                }
            }

            const fallbackCopy = (text) => {
                // document.execCommand('copy') can only copy text that is selected. The browser requires a selected
                // text range to perform the copy operation. So the string is temporarily placed into a selectable form.
                const tempTextArea = document.createElement('textarea');
                tempTextArea.value = text;
                document.body.appendChild(tempTextArea);
                tempTextArea.select();

                try {
                    const successful = document.execCommand('copy');
                    if (successful) {
                        showSuccessFeedback();
                    } else {
                        console.error('Unable to copy text');
                    }
                } catch (err) {
                    console.error('Could not copy text: ', err);
                } finally {
                    document.body.removeChild(tempTextArea);
                }
            }

            const init = () => {
                // Clicking the targetSelector will trigger copy
                if ($scope.customTooltipStyle && $scope.targetSelector) {
                    // Delay to ensure DOM is fully loaded when dynamically rendering
                    setTimeout(() => {
                        const target = document.querySelector($scope.targetSelector);
                        if (target) {
                            const clickHandler = function (e) {
                                e.stopPropagation();
                                $scope.copyToClipboard();
                            };
                            target.addEventListener('click', clickHandler);

                            $scope.$on('$destroy', () => {
                                target.removeEventListener('click', clickHandler);
                            });
                        } else {
                            console.warn('copyToClipboard: targetSelector not found:', $scope.targetSelector);
                        }
                    }, 0);
                }
            }

            // =========================
            // Initialization
            // =========================
            init();
        }
    };
}

export default CopyToClipboardModule;
