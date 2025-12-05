import {AgentToolModel} from './agent-tool';

/**
 * Model representing a retrieve time series tool used by the agent.
 * Extends {@link AgentToolModel} with additional retrieve time series specific properties.
 */
export class RetrieveTimeSeriesToolModel extends AgentToolModel {
  constructor(settings = {}) {
    super('retrieve_time_series', settings)
    this.baseUrl = settings.baseUrl || '';
    this.project = settings.project || '';
    this.clientName = settings.clientName || '';
  }
}
