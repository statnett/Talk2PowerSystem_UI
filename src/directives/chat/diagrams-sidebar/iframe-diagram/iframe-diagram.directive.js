import './iframe-diagram.directive.scss';
import template from './iframe-diagram.directive.html';
import {SvgDiagramManager} from "../svg-diagram-manager";
import {ChatContextEventName} from "../../../../services/chat/chat-context-event-name";
import {DiagramElementModel} from "../../../../models/chat/diagrams/diagram-element";

const dependencies = [];

const IframeDiagramModule = angular.module('tt2ps.components.chat.iframe-diagram', dependencies);
IframeDiagramModule.directive('iframeDiagram', IframeDiagramDirective);

IframeDiagramDirective.$inject = ['ChatContextService'];

function IframeDiagramDirective(ChatContextService) {
    return {
        restrict: 'E',
        scope: {
            diagram: '=',
            fullscreen: '='
        },
        template,
        link: function ($scope, element, attrs) {

            let iframe = undefined;
            let svgDiagramManager = undefined;

            // =========================
            // Private functions
            // =========================
            const init = () => {
                // Set time out to be sure the iframe is loaded before we try to access its content
                setTimeout(() => {
                    iframe = element[0].querySelector('.iframe-diagram');
                    svgDiagramManager = new SvgDiagramManager(iframe, onDiagramElementClicked, true);
                });
            }

            const onDiagramElementClicked = (iri) => {
                ChatContextService.emit(ChatContextEventName.ASK_FOR_DIAGRAM_ELEMENT, new DiagramElementModel($scope.diagram.type, iri));
            }


            /**
             * Cleans up all listeners/subscriptions when the directive is destroyed.
             */
            const removeAllSubscribers = () => {
                if (svgDiagramManager) {
                    svgDiagramManager.destroy();
                    svgDiagramManager = undefined;
                }
            };

            // Deregister the watcher when the scope/directive is destroyed
            $scope.$on('$destroy', removeAllSubscribers);

            init();
        }
    }
}

export default IframeDiagramModule;
