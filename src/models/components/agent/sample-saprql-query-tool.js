import {AgentToolModel} from './agent-tool';

/**
 * Model representing a sample SPARQL query tool used by the agent.
 * Extends {@link AgentToolModel} with additional sample SPARQL query specific properties.
 */
export class SampleSPARQLQueryToolModel extends AgentToolModel {
  constructor(settings = {}) {
    super('sample_sparql_queries', settings)
    this.sparqlQueryTemplate = settings.sparqlQueryTemplate || '';
    this.connectorName = settings.connectorName || '';
  }
}
