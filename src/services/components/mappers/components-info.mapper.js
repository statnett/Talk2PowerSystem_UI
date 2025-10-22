import {ComponentsInfoModel} from '../../../models/components/components-info';
import {toOntologiesModel} from './ontology.mapper';
import {toDatasetsModel} from './dataset.mapper';
import {toAgentModel} from './agent/agent.mapper';
import {toGraphDBModel} from './graphdb.mapper';
import {toBackendModel} from './backend.mapper';

/**
 * Converts the server response into a {@link ComponentsInfoModel} instance.
 *
 * @param {Object} [data={}] - Raw components info data received from the server.
 * @param {Object[]} [data.ontologies] - Array of ontology data.
 * @param {Object[]} [data.datasets] - Array of dataset data.
 * @param {Object} [data.agent] - Agent data object.
 * @param {Object} [data.graphdb] - GraphDB data object.
 * @param {Object} [data.backend] - Backend data object.
 * @returns {ComponentsInfoModel} A new {@link ComponentsInfoModel} instance populated with the provided data.
 */
export const toComponentInfoMapper = (data= {}) => {
  return new ComponentsInfoModel({
    ontologies: toOntologiesModel(data.ontologies),
    datasets: toDatasetsModel(data.datasets),
    agent: toAgentModel(data.agent),
    graphdb: toGraphDBModel(data.graphdb),
    backend: toBackendModel(data.backend)
  });
}
