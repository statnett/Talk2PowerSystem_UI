export class DiagramElementModel {
    /**
     *
     * @param {string} diagramType - the type of diagram this element belongs to (e.g. "svg", "iframe", etc.)
     * @param elementIRI - the Iri of the element.
     */
    constructor(diagramType, elementIRI) {
        this.diagramType = diagramType;
        this.elementIRI = elementIRI;
    }
}