import {AgentToolModel} from './agent-tool';

/**
 * Model representing a sample SPARQL query tool used by the agent.
 * Extends {@link AgentToolModel} with additional sample SPARQL query specific properties.
 */
export class SampleSPARQLQueryModel extends AgentToolModel {
  constructor(settings = {}) {
    super('sample_sparql_queries', settings)
    this.sparql_query_template = settings.sparql_query_template || '';
    this.connector_name = settings.connector_name || '';
  }
}
