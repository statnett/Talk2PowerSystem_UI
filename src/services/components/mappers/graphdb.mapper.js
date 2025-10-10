import {GraphDBModel} from '../../../models/components/graphdb';

/**
 * Converts raw GraphDB data from the server into a {@link GraphDBModel} instance.
 *
 * @param {Object} [data={}] - Raw GraphDB information received from the server.
 * @param {string} [data.baseUrl] - Base URL of the GraphDB instance.
 * @param {string} [data.repository] - Repository name used in GraphDB.
 * @param {string} [data.version] - Version of the GraphDB instance.
 * @param {number} [data.numberOfExplicitTriples] - Number of explicit triples.
 * @param {number} [data.numberOfTriples] - Total number of triples.
 * @param {string} [data.autocompleteIndexStatus] - Status of the autocomplete index.
 * @param {string} [data.rdfRankStatus] - Status of the RDF Rank.
 * @returns {GraphDBModel} A new {@link GraphDBModel} instance populated with the provided data.
 */
export const toGraphDBModel = (data = {}) => {
  return new GraphDBModel({...data});
}
