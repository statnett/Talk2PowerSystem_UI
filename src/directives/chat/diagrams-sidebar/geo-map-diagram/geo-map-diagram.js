import template from './geo-map-diagram.html';
import {ChatContextEventName} from '../../../../services/chat/chat-context-event-name';
import {DiagramElementModel} from '../../../../models/chat/diagrams/diagram-element';
import {DEVELOPMENT} from '../../../../configurations/app-configurations';

const dependencies = [];

const GeoMapDiagramModule = angular.module('tt2ps.components.chat.geo-map-diagram', dependencies);
GeoMapDiagramModule.directive('geoMapDiagram', geoMapDiagramDirective);

geoMapDiagramDirective.$inject = ['ChatContextService'];

function geoMapDiagramDirective(ChatContextService) {
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
            const onDiagramElementClicked = (event) => {
                const isValidOrigin = DEVELOPMENT || event.origin === window.location.origin;
                const { data } = event;
                if (!isValidOrigin || !data?.type) {
                    return;
                }

                if (data.type === 'yasgui.click.feature') {
                    const id = data.featurePayload?.id?.value;
                    if (id) {
                        ChatContextService.emit(
                            ChatContextEventName.ASK_FOR_DIAGRAM_ELEMENT,
                            new DiagramElementModel($scope.diagram.type, id)
                        );
                    }
                }
            };

            const init = () => {
                window.addEventListener("message", onDiagramElementClicked);
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

export default GeoMapDiagramModule;
