import {LLMModel} from '../../../../models/components/agent/llm';

/**Converts a raw server response object into an {@link LLMModel} instance.
 * This utility function maps the response properties to the corresponding
 * fields expected by the {@link LLMModel} constructor.
 *
 * @param {Object} data - The raw server response containing LLM configuration data.
 * @param {string} data.type - The LLM type identifier (e.g., "openai", "azure").
 * @param {string} data.model - The model name or ID (e.g., "gpt-4-turbo").
 * @param {number|null} [data.temperature] - Optional sampling temperature for response generation.
 * @param {number|null} [data.seed] - Optional seed value used for deterministic outputs.
 * @param {string|null} [data.reasoning_effort] - Optional configuration option for reasoning models.
 * @param {boolean|null} [data.use_responses_api] - For OpenAI and Azure OpenAI whether to use the Responses API instead of the Completions API.
 *
 * @returns {LLMModel} A new {@link LLMModel} instance populated with the provided data.
 *
 */
export const toLLMModel = (data) => {
  return new LLMModel({...data});
}
