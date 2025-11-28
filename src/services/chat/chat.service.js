import {chatAnswerModelMapper} from "./mappers/chat-message.mapper";
import ChatRestServiceModule from "./chat.rest.service";
import {explainResponseMapper} from "./mappers/explain.mapper";

const modules = [
    ChatRestServiceModule.name
];

const ChatServiceModule = angular
    .module('tt2ps.services.chat.chat-service', modules);
ChatServiceModule
    .factory('ChatService', ChatService);

ChatService.$inject = ['ChatRestService'];

function ChatService(ChatRestService) {

    /**
     * Creates a new conversation. The creation of a chat and asking a question share the same endpoint. If the request payload
     * doesn't contain the chat ID, the backend will create a new chat and return the answer, which includes the ID of the created chat.
     *
     * @param {ChatItemModel} chatItem - The conversation data.
     * @return {Promise<ChatAnswerModel>} The answer of the question.
     */
    const createConversation = (chatItem) => {
        return ChatRestService.createConversation(chatItem.toCreateChatRequestPayload())
            .then((response) => chatAnswerModelMapper(response.data));
    };

    /**
     * Asks a question.
     * @param {ChatItemModel} chatItem .
     * @return {Promise<ChatAnswerModel>} the answer of the question.
     */
    const askQuestion = (chatItem) => {
        return ChatRestService.askQuestion(chatItem.toAskRequestPayload())
            .then((response) => chatAnswerModelMapper(response.data));
    };


    /**
     * Continues a chat run. In essence continue means "fetch more answers".
     * @param {ContinueChatRun} continueData .
     * @return {Promise<ChatAnswerModel>} the next answer in the run.
     */
    const continueChatRun = (continueData) => {
        const payload = continueData.toContinueRunRequestPayload();
        return ChatRestService.continueChatRun(payload)
            .then((response) => chatAnswerModelMapper(response.data));
    };

    /**
     * Returns an explanation of how the answer was generated.
     * @param {ChatItemModel} chatItem
     * @param {string} messageId
     * @return {ExplainResponseModel}
     */
    const explainResponse = (chatItem, messageId) => {
        return ChatRestService.explainResponse(chatItem.toExplainResponsePayload(messageId))
            .then((response) => {
                return explainResponseMapper(response.data);
            });
    };

    return {
        createConversation,
        askQuestion,
        continueChatRun,
        explainResponse
    };
}

export default ChatServiceModule;
