import {AgentToolModel} from './agent-tool';

/**
 * Model representing a retrieve time series tool used by the agent.
 * Extends {@link AgentToolModel} with additional retrieve time series specific properties.
 */
export class RetrieveTimeSeriesModel extends AgentToolModel {
  constructor(settings = {}) {
    super('retrieve_time_series', settings)
    this.base_url = settings.base_url || '';
    this.project = settings.project || '';
    this.client_name = settings.client_name || '';
  }
}
