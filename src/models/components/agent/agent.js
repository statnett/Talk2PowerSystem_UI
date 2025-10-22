/**
 * Model representing the application agent.
 * Contains all settings and configurations for the agent used in the GraphDB instance.
 */
export class AgentModel {
  /**
   * @param {Object} [data={}] - Raw data for initializing the agent.
   * @param {string} [data.assistantInstructions] - Instructions for the agent.
   * @param {LLMModel} [data.llm] - The large language model (LLM) instance or configuration used by the agent.
   * @param {AgentToolModel[]} [data.tools] - A list of tools available to the agent.
   */
  constructor(data = {}) {
    /**
     * Instructions for the agent.
     * @type {string}
     */
    this.assistantInstructions = data.assistantInstructions || '';

    /**
     * The large language model (LLM) instance or configuration used by the agent.
     * @type {LLMModel}
     */
    this.llm = data.llm;

    /**
     * The tools available to the agent.
     * @type {AgentToolModel[]}
     */
    this.tools = data.tools || [];
  }
}
