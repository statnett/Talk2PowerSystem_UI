import {AgentToolModel} from './agent-tool';

/**
 * Model representing an autocomplete search tool used by the agent.
 * Extends {@link AgentToolModel} with additional autocomplete search specific properties.
 */
export class AutocompleteSearchToolModel extends AgentToolModel {
  constructor(settings = {}) {
    super('autocomplete_search', settings)
    this.propertyPath = settings.propertyPath || '';
    this.sparqlQueryTemplate = settings.sparqlQueryTemplate || '';
  }
}
