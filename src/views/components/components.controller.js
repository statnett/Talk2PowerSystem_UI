import './components.scss';
import ComponentsServiceModule from '../../services/components/components.service';
import {ComponentsInfoModel} from '../../models/components/components-info';
import CollapsibleCardModule from '../../directives/core/collapsible-card/collapsible-card.directive';
import ComponentsContextServiceModule from '../../services/components/components-context.service';
import OntologiesModule from '../../directives/components/ontologies/ontologies.directive';
import DatasetsModule from '../../directives/components/datesets/datasets.directive';
import FrontendModule from '../../directives/components/frontend/frontend.directive';
import GraphDBModule from '../../directives/components/graphdb/graphdb.directive';
import BackendModule from '../../directives/components/backend/backend.directive';
import AgentModule from '../../directives/components/agent/agent.directive';
import CollapsibleFieldsetModule from '../../directives/core/collapsible-fieldset/collapsible-fieldset.directive';

const dependencies = [
  ComponentsServiceModule.name,
  CollapsibleCardModule.name,
  ComponentsContextServiceModule.name,
  OntologiesModule.name,
  DatasetsModule.name,
  FrontendModule.name,
  GraphDBModule.name,
  BackendModule.name,
  AgentModule.name,
  CollapsibleFieldsetModule.name
];
const ComponentsModule = angular.module('tt2ps.controllers.components', dependencies);

ComponentsModule.controller('componentsCtrl', ComponentsCtrl);

ComponentsCtrl.$inject = ['$scope', 'ComponentsService', 'ComponentsContextService'];

function ComponentsCtrl($scope, ComponentsService, ComponentsContextService) {
  // =========================
  // Public variables
  // =========================
  $scope.componentsInfo = new ComponentsInfoModel();

  // =========================
  // Private functions
  // =========================
  const loadComponents = () => {
    ComponentsService.getComponentInfo()
      .then(componentsInfo => {
        $scope.componentsInfo = componentsInfo;
        ComponentsContextService.updateComponentsInfo($scope.componentsInfo);
      })
  }

  const init = () => {
    loadComponents()
  }

  init();
}

export default ComponentsModule;
