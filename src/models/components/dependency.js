/**
 * Model representing a dependency within the application.
 */
export class DependencyModel {
  constructor(data = {}) {
    /**
     * Name of the dependency.
     * @type {string}
     */
    this.name = data.name || '';

    /**
     * Version of the dependency.
     * @type {string}
     */
    this.version = data.version || '';
  }
}
