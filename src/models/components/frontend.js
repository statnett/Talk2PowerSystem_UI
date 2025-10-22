/**
 * Model represents metadata and dependency information used by the frontend, including the project configuration,
 * JavaScript runtime, framework, and other related packages.
 */
export class FrontendModel {
  constructor(data = {}) {
    /**
     * @type {DependencyModel}
     */
    this.project = data.project;
    /**
     * @type {DependencyModel}
     */
    this.runtime = data.runtime;

    /**
     *
     * @type {DependencyModel}
     */
    this.framework = data.framework;
    /**
     * Dependencies used in the frontend.
     * @type {DependencyModel[]}
     */
    this.dependencies = data.dependencies || [];
  }
}
