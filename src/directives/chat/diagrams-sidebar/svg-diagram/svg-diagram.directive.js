import './svg-diagram.directive.scss';
import template from './svg-diagram.directive.html';
import {ZoomDiagramHelper} from '../zoom-diagram-helper';
import {SvgDiagramManager} from "../svg-diagram-manager";
import {ChatContextEventName} from "../../../../services/chat/chat-context-event-name";
import {DiagramElementModel} from "../../../../models/chat/diagrams/diagram-element";

const dependencies = [];

const SvgDiagramModule = angular.module('tt2ps.components.chat.svg-diagram', dependencies);
SvgDiagramModule.directive('svgDiagram', SvgDiagramDirective);

SvgDiagramDirective.$inject = ['ChatContextService', 'DiagramService'];

function SvgDiagramDirective(ChatContextService, DiagramService) {
  return {
    restrict: 'E',
    scope: {
      diagram: '=',
      fullscreen: '='
    },
    template,
    link($scope, element) {
      ////////////////////////////
      //  Public variables
      ///////////////////////////
      $scope.svgDiagram = undefined;
      ////////////////////////////
      //  Private variables
      ///////////////////////////
      let zoomDiagramHelper = undefined;
      let svgDiagramManager = undefined;
      const subscriptions = [];

      ////////////////////////////
      //  Private functions
      ////////////////////////////
      const init = () => {
        loadSvg().then((svgDiagram) => {
          $scope.svgDiagram = svgDiagram;
          setTimeout(() => {
            const svgEl = element[0].querySelector('.svg-diagram');
            zoomDiagramHelper = new ZoomDiagramHelper(svgEl);
            svgDiagramManager = new SvgDiagramManager(svgEl, onDiagramElementClicked);
          });
        });
      }

      const loadSvg = () => {
        if ($scope.diagram.url) {
          return DiagramService.loadSVG($scope.diagram.url);
        } else {
          return Promise.resolve();
        }
      }

      const onDiagramElementClicked = (iri) => {
        ChatContextService.emit(ChatContextEventName.ASK_FOR_DIAGRAM_ELEMENT, new DiagramElementModel($scope.diagram.type, iri));
      }

      // =========================
      // Subscriptions
      // =========================

      const removeAllSubscribers = () => {
        subscriptions.forEach((subscription) => subscription());
        if (zoomDiagramHelper) {
          zoomDiagramHelper.destroy();
        }

        if (svgDiagramManager) {
          svgDiagramManager.destroy();
          svgDiagramManager = undefined;
        }
      };

      subscriptions.push($scope.$watch('fullscreen', (fullscreen) => {
        if (!fullscreen && zoomDiagramHelper) {
          zoomDiagramHelper.resetPosition();
        }
      }));

      // Deregister the watcher when the scope/directive is destroyed
      $scope.$on('$destroy', removeAllSubscribers);

      init();
    }
  }
}

export default SvgDiagramModule;
