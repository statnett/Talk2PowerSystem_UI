/**
 * Model representing a tool used by an agent.
 */
export class AgentToolModel {
  /**
   * @param {string} name - The name of the tool.
   * @param {Object} settings - Configuration settings for the tool.
   * @param {boolean} [settings.enabled] - Whether the tool is enabled.
   */
  constructor(name, settings = {}) {
    /**
     * The name of the tool.
     * @type {string}
     */
    this.name = name || '';

    /**
     * Whether the tool is enabled.
     * @type {boolean}
     */
    this.enabled = settings.enabled;
  }
}
