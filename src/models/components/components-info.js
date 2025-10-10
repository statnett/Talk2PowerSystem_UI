import {FrontendModel} from './frontend';
import {BackendModel} from './backend';
import {AgentModel} from './agent/agent';
import {GraphDBModel} from './graphdb';

/**
 * Model for all used components.
 */
export class ComponentsInfoModel {
  constructor(data = {}) {
    /**
     * Ontologies used in the system.
     * @type {OntologyModel[]}
     */
    this.ontologies = data.ontologies || [];

    /**
     * Datasets used in the system.
     * @type {DatasetModel[]}
     */
    this.datasets = data.datasets || [];

    /**
     * Agent info used in the system.
     * @type {AgentModel}
     */
    this.agent = data.agent || new AgentModel();

    /**
     * GraphDB instance info used in the system.
     * @type {GraphDBModel}
     */
    this.graphdb = data.graphdb || new GraphDBModel();

    /**
     * Backend info used in the system.
     * @type {BackendModel}
     */
    this.backend = data.backend || new BackendModel();

    /**
     * Frontend info used in the system.
     * @type {FrontendModel}
     */
    this.frontend = data.frontend || new FrontendModel();
  }
}
