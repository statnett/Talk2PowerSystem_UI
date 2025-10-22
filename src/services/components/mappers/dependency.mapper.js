import {DependencyModel} from '../../../models/components/dependency';

/**
 * Converts a raw dependencies object from the server into an array of {@link DependencyModel} instances.
 *
 * @param {Object} [data={}] - Raw dependencies object where keys are dependency names and values are version strings.
 * @returns {DependencyModel[]} An array of {@link DependencyModel} instances.
 */
export const toDependenciesModel = (data = {}) => {
  if (!data || typeof data !== 'object') return [];

  return Object.entries(data).map(([name, version]) =>
    new DependencyModel({ name, version })
  );
};
