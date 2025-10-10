/**
 * Model representing an ontology used by the system.
 */
export class OntologyModel {

  constructor(data = {}) {
    /**
     * The name of the ontology.
     * @type {string}
     */
    this.name = data.name || '';

    /**
     * The URI of the ontology.
     * @type {string}
     */
    this.uri = data.uri || '';

    /**
     * The version of the ontology.
     * @type {string}
     */
    this.version = data.version || '';

    /**
     * The last updated date of the ontology.
     * @type {string}
     */
    this.date = data.date || '';
  }
}
