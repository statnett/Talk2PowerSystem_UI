import './diagrams-sidebar.directive.scss';
import template from './diagrams-sidebar.directive.html';
import {DiagramTypes} from '../../../models/chat/diagrams/diagram-types';
import {ChatContextEventName} from '../../../services/chat/chat-context-event-name';

const dependencies = [];

const DiagramsSidebarModule = angular.module('tt2ps.components.chat.diagrams-sidebar', dependencies);
DiagramsSidebarModule.directive('diagramsSidebar', DiagramsSidebarDirective);

DiagramsSidebarDirective.$inject = ['ChatContextService'];

function DiagramsSidebarDirective(ChatContextService) {
  return {
    restrict: 'E',
    template,
    link($scope, element) {
      ////////////////////////////
      //  Public variables
      ///////////////////////////
      $scope.fullscreen = false;
      $scope.answersWithDiagrams = [];
      $scope.DiagramTypes = DiagramTypes;
      $scope.selectedDiagram = undefined;

      ////////////////////////////
      //  Public functions
      ///////////////////////////
      $scope.setFullscreen = () => {
        $scope.fullscreen = true;
        updateFullscreenClass();
      }

      $scope.exitFullscreen = () => {
        $scope.fullscreen = false;
        updateFullscreenClass();
      }

      ////////////////////////////
      //  Private functions
      ///////////////////////////
      const updateFullscreenClass = () => {
        const diagramElement = element[0].querySelector('.diagrams-sidebar-wrapper');
        if ($scope.fullscreen) {
          diagramElement.classList.add('fullscreen');
        } else {
          diagramElement.classList.remove('fullscreen');
        }
      }

      const onSelectedDiagramChanged = (diagram) => {
        $scope.selectedDiagram = diagram;
      }

      const onShowSelectedDiagramOnFullscreen = () => {
        $scope.setFullscreen();
      }


      // =========================
      // Subscriptions
      // =========================
      const subscriptions = [];

      const removeAllSubscribers = () => {
        subscriptions.forEach((subscription) => subscription());
      };

      subscriptions.push(ChatContextService.onSelectedDiagramChanged(onSelectedDiagramChanged));
      subscriptions.push(ChatContextService.subscribe(ChatContextEventName.SHOW_SELECTED_DIAGRAM_ON_FULLSCREEN, onShowSelectedDiagramOnFullscreen))

      // Deregister the watcher when the scope/directive is destroyed
      $scope.$on('$destroy', removeAllSubscribers);
    }
  }
}

export default DiagramsSidebarModule;
