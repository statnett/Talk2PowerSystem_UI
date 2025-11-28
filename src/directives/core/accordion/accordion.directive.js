import template from './accordion.directive.html';
import AccordionPanelModule from './accordion-panel/accordion-panel.directive';

const dependencies = [
  AccordionPanelModule.name,
];

const AccordionModule = angular.module('tt2ps.directives.core.accordion', dependencies);

AccordionModule.directive('accordion', Accordion);

Accordion.$inject = [];

/**
 * @ngdoc directive
 * @name accordion
 * @module tt2ps.directives.core.accordion
 * @restrict E
 *
 * @description
 * A reusable accordion component that allows panels to expand or collapse.
 * Behaves as:
 *  - a standard accordion when `single-open="true"`
 *  - a multi-expand collapsible list when omitted or `false`
 *
 * Each `accordion-panel` registers itself to this controller.
 *
 * @example
 * <!-- Only one panel can be open at a time -->
 * <accordion single-open="true">
 *   <accordion-panel heading="Section 1">
 *     <p>Content for panel 1</p>
 *   </accordion-panel>
 *
 *   <accordion-panel heading="Section 2">
 *     <p>Content for panel 2</p>
 *   </accordion-panel>
 * </accordion>
 *
 * @example
 * <!-- Multiple panels can remain open -->
 * <accordion single-open="false">
 *   <accordion-panel heading="Item A">
 *     <p>Detail A</p>
 *   </accordion-panel>
 *
 *   <accordion-panel heading="Item B">
 *     <p>Detail B</p>
 *   </accordion-panel>
 * </accordion>
 */
function Accordion() {
  return {
    transclude: true,
    template,
    scope: {
      /**
       * Whether only one panel can be open at a time.
       * `"true"` → single open behavior.
       * `"false"` or omitted → multiple open allowed.
       *
       * @type {string}
       */
      singleOpen: '@'
    },
    controller: function($scope) {
      /**
       * Holds all registered accordion panel scopes.
       * @private
       * @type {Array<Object>}
       */
      const panels = [];

      /**
       * Registers a new panel with the accordion.
       *
       * @param {Object} panelScope - The isolated scope of a panel directive.
       */
      this.registerPanel = function(panelScope) {
        panels.push(panelScope);
      };

      /**
       * Ensures only the specified panel remains open when `singleOpen="true"` is set.
       *
       * @param {Object} openPanel - The panel scope that should remain open.
       */
      this.openOnly = function(openPanel) {
        if ($scope.singleOpen) {
          angular.forEach(panels, function(panel) {
            if (panel !== openPanel) {
              panel.isOpen = false;
            }
          });
        }
      };
    }
  };
}

export default AccordionModule;
