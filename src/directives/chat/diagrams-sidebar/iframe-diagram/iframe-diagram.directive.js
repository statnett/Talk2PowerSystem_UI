import './iframe-diagram.directive.scss';
import template from './iframe-diagram.directive.html';

const dependencies = [];

const IframeDiagramModule = angular.module('tt2ps.components.chat.iframe-diagram', dependencies);
IframeDiagramModule.directive('iframeDiagram', IframeDiagramDirective);

IframeDiagramDirective.$inject = [];

function IframeDiagramDirective() {
  return {
    restrict: 'E',
    scope: {
      diagram: '=',
      fullscreen: '='
    },
    template
  }
}

export default IframeDiagramModule;
