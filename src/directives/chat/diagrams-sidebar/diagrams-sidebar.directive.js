import './diagrams-sidebar.directive.scss';
import template from './diagrams-sidebar.directive.html';
import { ChatContextEventName } from '../../../services/chat/chat-context-event-name';
import DiagramServiceModule from '../../../services/diagrams/diagram.service';
import ImageDiagramModule from './image-diagram/image-diagram.directive';
import SvgDiagramModule from './svg-diagram/svg-diagram.directive';
import IframeDiagramModule from './iframe-diagram/iframe-diagram.directive';

const dependencies = [
  DiagramServiceModule.name,
  ImageDiagramModule.name,
  SvgDiagramModule.name,
  IframeDiagramModule.name
];

const DiagramsSidebarModule = angular.module('tt2ps.components.chat.diagrams-sidebar', dependencies);

DiagramsSidebarModule.directive('diagramsSidebar', DiagramsSidebarDirective);

DiagramsSidebarDirective.$inject = ['ChatContextService'];

/**
 * @ngdoc directive
 * @name diagramsSidebar
 * @module tt2ps.components.chat.diagrams-sidebar
 * @restrict E
 *
 * @description
 * Sidebar used to display available diagrams and optionally open the selected diagram in fullscreen.
 * It subscribes to chat context events to update diagram selection and reactively enter fullscreen mode.
 *
 * @param {Object} ChatContextService - Service that publishes diagram selection events
 *
 */
function DiagramsSidebarDirective(ChatContextService) {
  return {
    restrict: 'E',
    template,

    link($scope, element) {

      //////////////////////////////
      // Public scope variables
      //////////////////////////////

      /**
       * Whether the diagram view is currently fullscreen.
       * @type {boolean}
       */
      $scope.fullscreen = false;

      /**
       * The currently selected diagram object.
       *
       * @type {DiagramModel}
       */
      $scope.selectedDiagram = undefined;


      //////////////////////////////
      // Public functions
      //////////////////////////////

      /**
       * Requests fullscreen mode for the diagram card. Also attaches wheel prevention on the header.
       */
      $scope.setFullscreen = () => {
        $scope.fullscreen = true;

        const card = element[0].querySelector('.diagram-card');
        if (card && card.requestFullscreen) {
          card.requestFullscreen().then(() => {
            const header = element[0].querySelector('.diagram-header');
            if (header) {
              header.addEventListener('wheel', stopWheel, { passive: false });
            }
          });
        }
      };

      /**
       * Exits fullscreen and removes the wheel-prevention handler.
       */
      $scope.exitFullscreen = () => {
        $scope.fullscreen = false;
        removeMouseWheelHandler();

        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
      };


      //////////////////////////////
      // Private functions
      //////////////////////////////
      /**
       * Called when another component updates the selected diagram.
       * @param {DiagramModel} diagram
       * @private
       */
      const onSelectedDiagramChanged = (diagram) => {
        $scope.selectedDiagram = diagram;
      };

      /**
       * Called when an external event requests fullscreen mode.
       */
      const onShowSelectedDiagramOnFullscreen = () => {
        $scope.setFullscreen();
      };

      /**
       * Removes the blocked wheel event on the header (if active).
       */
      const removeMouseWheelHandler = () => {
        const header = element[0].querySelector('.diagram-header');
        if (header) {
          header.removeEventListener('wheel', stopWheel);
        }
      };

      /**
       * Wheel-blocking helper used to prevent zooming in fullscreen.
       * @param {WheelEvent} e
       */
      const stopWheel = (e) => {
        e.preventDefault();
        e.stopPropagation();
      };


      //////////////////////////////
      // Subscriptions
      //////////////////////////////

      const subscriptions = [];
      subscriptions.push(ChatContextService.onSelectedDiagramChanged(onSelectedDiagramChanged));

      subscriptions.push(ChatContextService.subscribe(ChatContextEventName.SHOW_SELECTED_DIAGRAM_ON_FULLSCREEN, onShowSelectedDiagramOnFullscreen));

      /**
       * Cleans up all listeners/subscriptions when directive is destroyed.
       */
      const removeAllSubscribers = () => {
        subscriptions.forEach((fn) => fn());
        removeMouseWheelHandler();
      };

      $scope.$on('$destroy', removeAllSubscribers);
    }
  };
}

export default DiagramsSidebarModule;
