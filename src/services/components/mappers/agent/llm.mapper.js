import {LLMModel} from '../../../../models/components/agent/llm';

/**Converts a raw server response object into an {@link LLMModel} instance.
 * This utility function maps the response properties to the corresponding
 * fields expected by the {@link LLMModel} constructor.
 *
 * @param {Object} data - The raw server response containing LLM configuration data.
 * @param {string} data.type - The LLM type identifier (e.g., "openai", "azure").
 * @param {string} data.model - The model name or ID (e.g., "gpt-4-turbo").
 * @param {number} [data.temperature] - The sampling temperature for response generation.
 * @param {number} [data.seed] - Optional seed value used for deterministic outputs.
 *
 * @returns {LLMModel} A new {@link LLMModel} instance populated with the provided data.
 *
 */
export const toLLMModel = (data) => {
  return new LLMModel({...data});
}
