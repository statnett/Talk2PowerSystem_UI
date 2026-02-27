import './viz-graph-diagram.directive.scss';
import template from './viz-graph-diagram.directive.html';
import {SvgDiagramManager} from "../svg-diagram-manager";
import {ChatContextEventName} from "../../../../services/chat/chat-context-event-name";
import {DiagramElementModel} from "../../../../models/chat/diagrams/diagram-element";

const dependencies = [];

const VizGraphDiagramModel = angular.module('tt2ps.components.chat.viz-graph-diagram', dependencies);
VizGraphDiagramModel.directive('vizGraphDiagram', VizGraphDiagramDirective);

VizGraphDiagramDirective.$inject = ['ChatContextService'];

function VizGraphDiagramDirective(ChatContextService) {
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
                    iframe = element[0].querySelector('.viz-graph-diagram');
                    svgDiagramManager = new SvgDiagramManager(iframe, 'id', onDiagramElementClicked, true);
                });
            }

            const onDiagramElementClicked = (id) => {
                ChatContextService.emit(ChatContextEventName.ASK_FOR_DIAGRAM_ELEMENT, new DiagramElementModel($scope.diagram.type, id));
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

export default VizGraphDiagramModel;
