import DiagramRestServiceModule from './diagram.rest.service';
import {imageDiagramBlobMapper} from './mappers/image-diagram-mapper';

const dependencies = [
    DiagramRestServiceModule.name
];

const DiagramServiceModule = angular.module('tt2ps.services.diagram-service', dependencies);
DiagramServiceModule.factory('DiagramService', DiagramService);

DiagramService.$inject = ['DiagramRestService'];

function DiagramService(DiagramRestService) {

    const loadImage = (url) => {
        return DiagramRestService.loadImage(url)
            .then((response) => {
                return imageDiagramBlobMapper(response.data);
            });
    };

    return {
        loadImage
    };
}

export default DiagramServiceModule;
