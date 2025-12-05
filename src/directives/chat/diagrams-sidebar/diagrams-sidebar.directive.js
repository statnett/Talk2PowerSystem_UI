import './diagrams-sidebar.directive.scss';
import template from './diagrams-sidebar.directive.html';
import {
  ChatContextEventName
} from '../../../services/chat/chat-context-event-name';
import {DiagramTypes} from '../../../models/chat/diagrams/diagram-types';
import DiagramServiceModule from '../../../services/diagrams/diagram.service';

const dependencies = [
  DiagramServiceModule.name
];

const DiagramsSidebarModule = angular.module('tt2ps.components.chat.diagrams-sidebar', dependencies);
DiagramsSidebarModule.directive('diagramsSidebar', DiagramsSidebarDirective);

DiagramsSidebarDirective.$inject = ['ChatContextService', 'DiagramService'];

function DiagramsSidebarDirective(ChatContextService, DiagramService) {
  return {
    restrict: 'E',
    template,
    link($scope, element) {
      ////////////////////////////
      //  Public variables
      ///////////////////////////
      $scope.fullscreen = false;
      $scope.answersWithDiagrams = [];
      $scope.selectedDiagram = undefined;
      $scope.imageDiagram = undefined;

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
        if ($scope.selectedDiagram && $scope.selectedDiagram.type === DiagramTypes.IMAGE) {
          DiagramService.loadImage($scope.selectedDiagram.url)
            .then((imageDiagram) => {
              $scope.imageDiagram = imageDiagram;
            });

        }
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
