/**
 * Model for the backend components.
 * Contains information about the backend build, version, and used dependencies.
 */
export class BackendModel {

  constructor(data = {}) {
    /**
     * @type {string}
     */
    this.description = data.description || '';

    /**
     * Version of the backend.
     * @type {string}
     */
    this.version = data.version || '';

    /**
     * Build date of the backend.
     * @type {string}
     */
    this.buildDate = data.buildDate || '';

    /**
     * Build branch of the backend.
     * @type {*|string}
     */
    this.buildBranch = data.buildBranch || '';

    /**
     * Git SHA of the backend.
     * @type {*|string}
     */
    this.gitSHA = data.gitSHA || '';

    /**
     * Python version used in the backend.
     * @type {*|string}
     */
    this.pythonVersion = data.pythonVersion || '';

      /**
       * Used dependencies from backend.
       * @type {DependencyModel[]}
       */
      this.dependencies = data.dependencies || [];
  }
}
