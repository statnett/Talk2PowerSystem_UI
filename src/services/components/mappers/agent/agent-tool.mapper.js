import {AgentToolModel} from '../../../../models/components/agent/agent-tool';
import {AutocompleteSearchTool} from '../../../../models/components/agent/autocomplete-search-tool';
import {SampleSPARQLQueryModel} from '../../../../models/components/agent/sample-saprql-query';
import {RetrieveDataPointsModel} from '../../../../models/components/agent/retrieve-data-points';
import {RetrieveTimeSeriesModel} from '../../../../models/components/agent/retrieve-time-series';

/**
 * Converts the server response into an array of {@link AgentToolModel} (or subclasses) instances.
 *
 * @param {Object} [data={}] - Raw agent tools data received from the server,
 * where each key is a tool name and each value is the tool's configuration object.
 * @returns {AgentToolModel[]} A list of agent tools created from the provided data.
 */
export const toAgentTools = (data = {}) => {
  return Object.entries(data)
    .map(([name, settings]) => toAgentTool( name, settings));
}

export const toAgentTool = (name, settings) => {
  switch (name) {
    case 'autocomplete_search':
      return new AutocompleteSearchTool(settings);
    case 'sample_sparql_queries':
      return new SampleSPARQLQueryModel(settings);
    case 'retrieve_data_points':
      return new RetrieveDataPointsModel(settings);
    case 'retrieve_time_series':
      return new RetrieveTimeSeriesModel(settings);
    default:
      return new AgentToolModel(name, settings);
  }
}
