import {AgentToolModel} from './agent-tool';

/**
 * Model representing a graphic display tool used by the agent.
 *
 * Extends {@link AgentToolModel} by adding properties required for generating graphical output.
 */
export class DisplayGraphicsToolModel extends AgentToolModel {
  constructor(settings = {}) {
    super('display_graphics', settings)
    this.sparqlQueryTemplate = settings.sparqlQueryTemplate || '';
  }
}
