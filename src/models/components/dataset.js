/**
 * Model representing a dataset used by the system.
 */
export class DatasetModel {
  constructor(data = {}) {
    /**
     * The name of the dataset.
     * @type {string}
     */
    this.name = data.name || '';

    /**
     * The URI of the dataset.
     * @type {string}
     */
    this.uri = data.uri || '';

    /**
     * The last updated date of the dataset.
     * @type {string}
     */
    this.date = data.date || '';
  }
}
