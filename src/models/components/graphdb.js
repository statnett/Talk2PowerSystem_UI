import {AUTOCOMPLETE_STATUS} from './autocmplete-status';
import {RDF_RANK_STATUS} from './rdf-rank-status';

/**
 * Model representing GraphDB instance information.
 */
export class GraphDBModel {
  constructor(data = {}) {
    /**
     * The version of the GraphDB.
     * @type {string}
     */
    this.version = data.version || '';

    /**
     * The number of explicit triples in the GraphDB.
     * @type {*|number}
     */
    this.numberOfExplicitTriples = data.numberOfExplicitTriples || 0;

    /**
     * The number of all triples in the GraphDB.
     * @type {*|number}
     */
    this.numberOfTriples = data.numberOfTriples || 0

    /**
     * The status of the autocompletion.
     * @type {AUTOCOMPLETE_STATUS.CANCELED | AUTOCOMPLETE_STATUS.BUILDING | AUTOCOMPLETE_STATUS.ERROR | AUTOCOMPLETE_STATUS.NONE | AUTOCOMPLETE_STATUS.READY | AUTOCOMPLETE_STATUS.READY_CONFIG}
     */
    this.autocompleteIndexStatus = data.autocompleteIndexStatus || AUTOCOMPLETE_STATUS.NONE;

    /**
     * The status of the RDF Rank.
     * @type {RDF_RANK_STATUS.CANCELED | RDF_RANK_STATUS.COMPUTED | RDF_RANK_STATUS.COMPUTING | RDF_RANK_STATUS.EMPTY | RDF_RANK_STATUS.ERROR | RDF_RANK_STATUS.OUTDATED | RDF_RANK_STATUS.CONFIG_CHANGED}
     */
    this.rdfRankStatus = data.rdfRankStatus || RDF_RANK_STATUS.EMPTY;

    /**
     * The base URL of the GraphDB.
     * @type {string}
     */
    this.baseUrl = data.baseUrl || '';

    /**
     * The used repository in the GraphDB.
     * @type {*|string}
     */
    this.repository = data.repository || '';
  }
}
