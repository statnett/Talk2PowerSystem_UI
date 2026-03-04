export class DiagramElementModel {
    /**
     *
     * @param {string} diagramType - the type of diagram this element belongs to (e.g. "svg", "iframe", etc.)
     * @param value - the value of the element.
     */
    constructor(diagramType, value) {
        this.diagramType = diagramType;
        this.value = value;
    }
}