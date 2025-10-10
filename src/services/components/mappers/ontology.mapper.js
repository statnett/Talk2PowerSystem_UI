import {OntologyModel} from '../../../models/components/ontology';

/**
 * Converts an array of raw ontology objects from the server into an array of {@link OntologyModel} instances.
 *
 * @param {Object[]} [data=[]] - Array of raw ontology data from the server.
 * @returns {OntologyModel[]} An array of {@link OntologyModel} instances.
 */
export const toOntologiesModel = (data = []) => {
  return data.map(toOntologyModel);
};

/**
 * Converts a single raw ontology object from the server into an {@link OntologyModel} instance.
 *
 * @param {Object} [data={}] - Raw ontology data from the server.
 * @param {string} [data.name] - Name of the ontology.
 * @param {string} [data.uri] - URI of the ontology (can be used in resource view).
 * @param {string} [data.version] - Version of the ontology.
 * @param {string} [data.date] - Last updated date of the ontology.
 * @returns {OntologyModel} A new {@link OntologyModel} instance.
 */
export const toOntologyModel = (data = {}) => {
  return new OntologyModel({...data});
};
