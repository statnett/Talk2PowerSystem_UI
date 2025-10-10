import {BackendModel} from '../../../models/components/backend';
import {toDependenciesModel} from './dependency.mapper';

/**
 * Converts the server response into a {@link BackendModel} instance.
 *
 * @param {Object} [data={}] - Raw backend information received from the server.
 * @param {string} [data.description] - Description of the backend system.
 * @param {string} [data.version] - Backend version number.
 * @param {string} [data.buildDate] - Date when the backend was built.
 * @param {string} [data.buildBranch] - Git branch used for the build.
 * @param {string} [data.gitSHA] - Git commit SHA identifier.
 * @param {string} [data.pythonVersion] - Version of Python used in the backend.
 * @param {Object} [data.dependencies] - Key-value pairs of backend dependencies.
 * @returns {BackendModel} A new {@link BackendModel} instance populated with the provided data.
 */
export const toBackendModel = (data = {}) => {
  return new BackendModel({
    description: data.description,
    version: data.version,
    buildDate: data.buildDate,
    buildBranch: data.buildBranch,
    gitSHA: data.gitSHA,
    pythonVersion: data.pythonVersion,
    dependencies: toDependenciesModel(data.dependencies)
  });
}
