import {AgentToolModel} from './agent-tool';

/**
 * Model representing a retrieve data points tool used by the agent.
 * Extends {@link AgentToolModel} with additional retrieve data points specific properties.
 */
export class RetrieveDataPointsToolModel extends AgentToolModel {
  constructor(settings = {}) {
    super('retrieve_data_points', settings)
    this.baseUrl = settings.baseUrl || '';
    this.project = settings.project || '';
    this.clientName = settings.clientName || '';
  }
}
