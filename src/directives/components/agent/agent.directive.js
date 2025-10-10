import template from './agent.directive.html';
import PropertyModule from '../../core/property/property.directive';
import {AgentModel} from '../../../models/components/agent/agent';
import PropertyTextareaModule from '../../core/property-textarea/property-textarea.directive';
import PropertyInputModule from '../../core/property-input/property-input.directive';
import AgentToolsModule from './tools/agent-tools.directive';

const dependencies = [
  PropertyModule.name,
  PropertyInputModule.name,
  PropertyTextareaModule.name,
  AgentToolsModule.name,
];
const AgentModule = angular.module('tt2ps.directives.components.agent', dependencies);

AgentModule.directive('agent', AgentDirective);

AgentDirective.$inject = ['ComponentsContextService'];


/**
 * @name agent
 * @restrict E
 * @scope
 * @description
 * The `agent` directive displays agent information.
 *
 * @example
 * <agent></agent>
 */
function AgentDirective(ComponentsContextService) {
  return {
    template,
    restrict: 'E',
    scope: {},
    link: function ($scope) {
      // =========================
      // Public variables
      // =========================
      /**
       * @type {AgentModel}
       */
      $scope.agent = new AgentModel();

      // =========================
      // Private variables
      // =========================
      const subscriptions = [];

      // =========================
      // Private functions
      // =========================
      const onComponentsInfoChanged = (componentsInfo) => {
        $scope.agent = componentsInfo.agent;
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

export default AgentModule;
