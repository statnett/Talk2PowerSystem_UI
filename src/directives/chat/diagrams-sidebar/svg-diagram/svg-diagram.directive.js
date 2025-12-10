import './svg-diagram.directive.scss';
import template from './svg-diagram.directive.html';
import {ZoomDiagramHelper} from '../zoom-diagram-helper';

const dependencies = [];

const SvgDiagramModule = angular.module('tt2ps.components.chat.svg-diagram', dependencies);
SvgDiagramModule.directive('svgDiagram', SvgDiagramDirective);

SvgDiagramDirective.$inject = [];

function SvgDiagramDirective() {
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
      ////////////////////////////
      const init = () => {
        setTimeout(() => {
          const svgEl = element[0].querySelector('.svg-diagram');
          zoomDiagramHelper = new ZoomDiagramHelper(svgEl);
        });
      }

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
