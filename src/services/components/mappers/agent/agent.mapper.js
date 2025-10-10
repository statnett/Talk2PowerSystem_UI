import {AgentModel} from '../../../../models/components/agent/agent';
import {toLLMModel} from './llm.mapper';
import {toAgentTools} from './agent-tool.mapper';

/**
 * Converts the raw agent data into an {@link AgentModel} instance.
 *
 * @param {Object} [data={}] - Raw agent data received from the server.
 * @param {string} [data.assistantInstructions] - Instructions for the agent.
 * @param {Object} [data.llm] - Data representing the large language model (LLM) used by the agent.
 * @param {Object[]|*[]} [data.tools] - Data representing the tools available to the agent.
 * @returns {AgentModel} A new instance of {@link AgentModel} populated with the provided data.
 */
export const toAgentModel = (data = {}) => {
  return new AgentModel({
    assistantInstructions: data.assistantInstructions || '',
    llm: toLLMModel(data.llm),
    tools: toAgentTools(data.tools)
  });
}
