import {DatasetModel} from '../../../models/components/dataset';

/**
 * Converts an array of raw dataset objects from the server into an array of {@link DatasetModel} instances.
 *
 * @param {Object[]} [data=[]] - Array of raw dataset data from the server.
 * @returns {DatasetModel[]} An array of {@link DatasetModel} instances.
 */
export const toDatasetsModel = (data = []) => {
  return data.map(toDatasetModel);
};

/**
 * Converts a single raw dataset object from the server into a {@link DatasetModel} instance.
 *
 * @param {Object} data - Raw dataset data from the server.
 * @param {string} [data.name] - Name of the dataset.
 * @param {string} [data.uri] - URI of the dataset.
 * @param {string} [data.date] - Last updated date of the dataset.
 * @returns {DatasetModel} A new {@link DatasetModel} instance.
 */
export const toDatasetModel = (data) => {
  return new DatasetModel({...data});
};
