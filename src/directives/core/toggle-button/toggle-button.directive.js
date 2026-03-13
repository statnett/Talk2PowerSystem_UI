import './toggle-button.directive.scss';
import template from './toggle-button.directive.html';

const dependencies = [];
const ToggleButtonModule = angular.module('tt2ps.directives.core.toggle-button', dependencies);

ToggleButtonModule.directive('toggleButton', ToggleButton);

ToggleButton.$inject = [];

/**
 * Directive: toggleButton
 *
 * Scope bindings:
 *  - active: two-way binding, boolean, whether the toggle is active
 *  - tooltip: string, the text to show on hover
 *
 * @returns {object} AngularJS directive definition object
 */
function ToggleButton() {
    return {
        restrict: 'E',
        template,
        scope: {
            active: '=',
            tooltip: '@',
        },
        link: function (scope, element) {
            const unsubscribes = [];

            const init = () => {
                // Select the toggle switch element inside the directive
                let toggleButton = angular.element(element[0].querySelector('.toggle-switch'));
                if (!toggleButton) {
                    return;
                }

                // Watch the 'active' state and toggle the CSS class
                unsubscribes.push(scope.$watch('active', (newVal) => {
                    toggleButton.toggleClass('active', !!newVal);
                }));

                // Tooltips in AngularJS often only render when a mouseenter event occurs. If the tooltip text changes
                // while the user is already hovering over the element, the tooltip does not automatically refresh.
                // To force the tooltip to update, we simulate a `mouseleave` followed by a `mouseenter`. This destroys
                // the old tooltip and recreates it with the new text.
                // Watch the tooltip text and force tooltip refresh on change
                unsubscribes.push(scope.$watch('tooltip', () => {
                    // Trigger 'mouseleave' to destroy the old tooltip
                    toggleButton.triggerHandler('mouseleave');
                    // Delay a little to allow tooltip destruction, then trigger 'mouseenter'
                    // to recreate the tooltip with the updated text
                    setTimeout(() => {
                        toggleButton.triggerHandler('mouseenter');
                    });
                }));
            }

            // Cleanup watchers when the element is destroyed
            element.on('$destroy', () => {
                unsubscribes.forEach(unsubscribe => unsubscribe());
            });

            init();
        }
    };
}

export default ToggleButtonModule;