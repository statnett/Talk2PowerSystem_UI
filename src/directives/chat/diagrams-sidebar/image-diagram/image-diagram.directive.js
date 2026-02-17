import './image-diagram.directive.scss';
import template from './image-diagram.directive.html';
import { ZoomDiagramHelper } from '../zoom-diagram-helper';

const dependencies = [];

const ImageDiagramModule = angular.module('tt2ps.components.chat.image-diagram', dependencies);
ImageDiagramModule.directive('imageDiagram', ImageDiagramDirective);

ImageDiagramDirective.$inject = ['$translate', 'DiagramService', 'ToastrService'];

function ImageDiagramDirective($translate, DiagramService, ToastrService) {
  return {
    restrict: 'E',
    scope: {
      diagram: '=',
      fullscreen: '='
    },
    template,
    link($scope, element) {
      ////////////////////////////
      //  Private variables
      ///////////////////////////
      let zoomDiagramHelper = undefined;
      const subscriptions = [];

      ////////////////////////////
      //  Private functions
      ///////////////////////////
      const init = () => {
        loadImage($scope.diagram);
      };

      const initZoomHelper = (imgEl) => {
        if (zoomDiagramHelper) {
          zoomDiagramHelper.destroy();
        }
        zoomDiagramHelper = new ZoomDiagramHelper(imgEl);
      };

      const loadImage = (diagram) => {
        if (!diagram) {
          return;
        }
        DiagramService.loadImage(diagram.url)
          .then((imageDiagram) => {
            $scope.imageDiagram = imageDiagram;
            if (!$scope.imageDiagram) {
              return;
            }

            /**
             * Use setTimeout to ensure that the image diagram is fully rendered before initialization.
             */
            setTimeout(() => {
              const imgEl = element[0].querySelector('.image-diagram');
              if (imgEl) initZoomHelper(imgEl);
            });
          })
          .catch(() => {
            $scope.imageDiagram = null;
            ToastrService.error($translate.instant('chat_panel.error.diagram_not_found'));
          });
      };

      // =========================
      // Subscriptions
      // =========================
      const removeAllSubscribers = () => {
        subscriptions.forEach((subscription) => subscription());
        if (zoomDiagramHelper) {
          zoomDiagramHelper.destroy();
        }
      };

      subscriptions.push($scope.$watch('fullscreen', (fullscreen) => {
        if (zoomDiagramHelper) {
          zoomDiagramHelper.resetPosition();
        }
      }));

      subscriptions.push($scope.$watch('diagram', (newDiagram, oldDiagram) => {
        if (newDiagram && newDiagram !== oldDiagram) {
          loadImage(newDiagram);
        }
      }));

      $scope.$on('$destroy', removeAllSubscribers);

      init();
    }
  }
}

export default ImageDiagramModule;
