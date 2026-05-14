import './viz-graph-diagram.directive.scss';
import template from './viz-graph-diagram.directive.html';
import {ChatContextEventName} from '../../../../services/chat/chat-context-event-name';
import {DiagramElementModel} from '../../../../models/chat/diagrams/diagram-element';
import {DEVELOPMENT} from "../../../../configurations/app-configurations";

const dependencies = [];

const VizGraphDiagramModule = angular.module('tt2ps.components.chat.viz-graph-diagram', dependencies);
VizGraphDiagramModule.directive('vizGraphDiagram', VizGraphDiagramDirective);

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

            // =========================
            // Private functions
            // =========================
            /**
             * Emits a request for loading diagram element details.
             *
             * @param {string} value Diagram element identifier.
             */
            const emitDiagramElement = (value) => {
                ChatContextService.emit(
                    ChatContextEventName.ASK_FOR_DIAGRAM_ELEMENT,
                    new DiagramElementModel($scope.diagram.type, value)
                );
            };

            const onDiagramElementClicked = (event) => {
                const isValidOrigin = DEVELOPMENT || event.origin === window.location.origin;

                if (!isValidOrigin || !event.data?.type) {
                    return;
                }

                const { data } = event;

                if (data.type === 'visgraph.click.node') {
                    const iri = data.iri;
                    if (iri) {
                        emitDiagramElement(iri);
                    }
                } else if (data.type === 'visgraph.click.edge') {
                    const source = data.source?.iri;
                    const target = data.target?.iri;
                    if (source && target) {
                        emitDiagramElement(
                            JSON.stringify({ source, target })
                        );
                    }
                }
            };

            const init = () => {
                window.addEventListener('message', onDiagramElementClicked);
            }

            /**
             * Cleans up all listeners/subscriptions when the directive is destroyed.
             */
            const removeAllSubscribers = () => {
                window.removeEventListener('message', onDiagramElementClicked);
            };

            // Deregister the watcher when the scope/directive is destroyed
            $scope.$on('$destroy', removeAllSubscribers);

            init();
        }
    }
}

export default VizGraphDiagramModule;
