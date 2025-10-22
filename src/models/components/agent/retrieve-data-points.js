import {AgentToolModel} from './agent-tool';

/**
 * Model representing a retrieve data points tool used by the agent.
 * Extends {@link AgentToolModel} with additional retrieve data points specific properties.
 */
export class RetrieveDataPointsModel extends AgentToolModel {
  constructor(settings = {}) {
    super('retrieve_data_points', settings)
    this.base_url = settings.base_url || '';
    this.project = settings.project || '';
    this.client_name = settings.client_name || '';
  }
}
