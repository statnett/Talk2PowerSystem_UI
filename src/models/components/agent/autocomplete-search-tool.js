import {AgentToolModel} from './agent-tool';

/**
 * Model representing an autocomplete search tool used by the agent.
 * Extends {@link AgentToolModel} with additional autocomplete search specific properties.
 */
export class AutocompleteSearchTool extends AgentToolModel {
  constructor(settings = {}) {
    super('autocomplete_search', settings)
    this.property_path = settings.property_path || '';
    this.sparql_query_template = settings.sparql_query_template || '';
  }
}
