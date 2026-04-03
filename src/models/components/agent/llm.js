/**
 * Model representing a large language model (LLM) configuration used by the agent.
 */
export class LLMModel {
  constructor(data = {}) {
    /**
     * Type of the LLM (e.g., GPT, Claude).
     * @type {string}
     */
    this.type = data.type || '';

    /**
     * Name or identifier of the LLM model.
     * @type {string}
     */
    this.model = data.model || '';

    /**
     * @type {number}
     */
    this.temperature = data.temperature;

    /**
     * @type {number|null}
     */
    this.seed = data.seed !== undefined ? data.seed : null;

    /**
     * @type {boolean|null}
     */
    this.use_responses_api = (data.use_responses_api !== undefined && data.use_responses_api !== null)
        ? !!data.use_responses_api
        : null;
  }
}
