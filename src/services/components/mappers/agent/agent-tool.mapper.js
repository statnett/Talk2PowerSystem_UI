import {AgentToolModel} from '../../../../models/components/agent/agent-tool';
import {SampleSPARQLQueryToolModel} from '../../../../models/components/agent/sample-saprql-query-tool';
import {DisplayGraphicsToolModel} from '../../../../models/components/agent/display-graphics-tool';
import {RetrieveTimeSeriesToolModel} from '../../../../models/components/agent/retrieve-time-series-tool';
import {RetrieveDataPointsToolModel} from '../../../../models/components/agent/retrieve-data-points-tool';
import {AutocompleteSearchToolModel} from '../../../../models/components/agent/autocomplete-search-tool';

/**
 * Converts the server response into an array of {@link AgentToolModel} (or subclasses) instances.
 *
 * @param {Object} [data={}] - Raw agent tools data received from the server,
 * where each key is a tool name and each value is the tool's configuration object.
 * @returns {AgentToolModel[]} A list of agent tools created from the provided data.
 */
export const toAgentTools = (data = {}) => {
  return Object.entries(data)
    .map(([name, settings]) => toAgentTool(name, settings));
}

export const toAgentTool = (name, settings) => {
  switch (name) {
    case 'autocomplete_search':
      return new AutocompleteSearchToolModel({
        enabled: settings.enabled,
        propertyPath: settings.property_path,
        sparqlQueryTemplate: settings.sparql_query_template
      });
    case 'sample_sparql_queries':
      return new SampleSPARQLQueryToolModel({
        enabled: settings.enabled,
        connectorName: settings.connector_name,
        sparqlQueryTemplate: settings.sparql_query_template
      });
    case 'retrieve_data_points':
      return new RetrieveDataPointsToolModel({
        enabled: settings.enabled,
        baseUrl: settings.base_url,
        project: settings.project,
        clientName: settings.client_name
      });
    case 'retrieve_time_series':
      return new RetrieveTimeSeriesToolModel({
        enabled: settings.enabled,
        baseUrl: settings.base_url,
        project: settings.project,
        clientName: settings.client_name
      });
    case 'display_graphics':
      return new DisplayGraphicsToolModel({
        enabled: settings.enabled,
        sparqlQueryTemplate: settings.sparql_query_template
      });
    default:
      return new AgentToolModel(name, settings);
  }
}
