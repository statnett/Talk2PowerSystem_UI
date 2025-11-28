import './accordion-panel.directive.scss';
import template from './accordion-panel.directive.html';

const AccordionPanelModule = angular.module('tt2ps.directives.core.accordion.accordion-panel', []);

AccordionPanelModule.directive('accordionPanel', AccordionPanel);

AccordionPanel.$inject = [];

/**
 * @ngdoc directive
 * @name accordionPanel
 * @module tt2ps.directives.core.accordion.accordion-panel
 * @restrict E
 * @require ^accordion
 *
 * @description
 * Represents a single section inside an `accordion`. The panel displays a title and optional icon
 * and toggles open/closed when clicked. It registers itself with the parent `accordion` directive, which manages
 * open state and enforces single-panel-open mode if enabled.
 *
 * @scope
 * @param {string} question-title  The title/label displayed in the panel header.
 * @param {string} [icon]          Optional icon reference displayed next to the title.
 *
 * @example
 * <accordion single-open="true">
 *   <accordion-panel
 *     question-title="General Questions"
 *     icon="/assets/icons/help.svg">
 *     <p>Your content for this panel goes here.</p>
 *   </accordion-panel>
 *
 *   <accordion-panel question-title="Advanced Settings">
 *     <p>Another content block here.</p>
 *   </accordion-panel>
 * </accordion>
 */
function AccordionPanel() {
  return {
    require: '^accordion',
    transclude: true,
    scope: {
      /**
       * Title displayed in the accordion panel header.
       * @type {string}
       */
      questionTitle: '@',

      /**
       * Optional icon displayed before the title.
       * Can be a path or a lookup key depending on your implementation.
       * @type {string=}
       */
      icon: '@'
    },
    template,
    link: function(scope, element, attrs, accordionCtrl) {
      /**
       * Tracks whether the panel is currently expanded.
       * @type {boolean}
       */
      scope.isOpen = false;

      // Register this panel with the parent accordion
      accordionCtrl.registerPanel(scope);

      /**
       * Toggles this panel’s open state. If accordion is configured for single-open behavior, other panels
       * will be closed automatically.
       */
      scope.toggle = () => {
        scope.isOpen = !scope.isOpen;

        if (scope.isOpen) {
          accordionCtrl.openOnly(scope);
        }
      };
    }
  };
}

export default AccordionPanelModule;
