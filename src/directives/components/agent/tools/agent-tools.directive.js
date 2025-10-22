import './agent-tools.directive.scss';
import template from './agent-tools.directive.html';
import CollapsibleFieldsetModule from '../../../core/collapsible-fieldset/collapsible-fieldset.directive';

const dependencies = [
  CollapsibleFieldsetModule.name,
];
const AgentToolsModule = angular.module('tt2ps.directives.components.agent-tools', dependencies);

AgentToolsModule.directive('agentTools', AgentToolsDirective);

AgentToolsDirective.$inject = ['ComponentsContextService'];


/**
 * @name agent-tools
 * @restrict E
 * @scope
 * @description
 * The `agent-tools` directive displays agent tools information.
 *
 * @example
 * <agent-tools></agent-tools>
 */
function AgentToolsDirective(ComponentsContextService) {
  return {
    template,
    restrict: 'E',
    scope: {},
    link: function ($scope) {
      // =========================
      // Public variables
      // =========================
      /**
       * @type {AgentToolModel[]}
       */
      $scope.agentTools = [];

      // =========================
      // Private variables
      // =========================
      const subscriptions = [];

      // =========================
      // Private functions
      // =========================
      const onComponentsInfoChanged = (componentsInfo) => {
        $scope.agentTools = componentsInfo.agent.tools;
      }

      const removeAllSubscriptions = () => {
        subscriptions.forEach(unsubscribe => unsubscribe());
      }

      // =========================
      // Subscriptions
      // =========================
      subscriptions.push(ComponentsContextService.onComponentsInfoChanged(onComponentsInfoChanged));

      $scope.$on('$destroy', removeAllSubscriptions);
    }
  };
}

export default AgentToolsModule;
