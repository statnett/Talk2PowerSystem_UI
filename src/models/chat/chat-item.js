import {ChatMessageModel} from "./chat-message";

/**
 *
 * Represents a model that holds a question and the answer of it in a chat.
 *
 */
export class ChatItemModel {

    /**
     * Creates an instance of ChatItemModel.
     *
     * @param {string} chatId - The unique identifier for the chat associated with this instance.
     * @param {ChatMessageModel} question - The message object representing the question.
     */
    constructor(chatId, question) {

        /**
         * @type {string | undefined}
         * @private
         */
        this._chatId = chatId;

        /**
         * @type {ChatMessageModel}
         * @private
         */
        this._question = question;

        /**
         *
         * @type {ChatMessageModel[] | undefined}
         * @private
         */
        this._answers = [];
    }

    get chatId() {
        return this._chatId;
    }

    set chatId(value) {
        this._chatId = value;
    }

    get question() {
        return this._question;
    }

    set question(value) {
        this._question = value;
    }

    get answers() {
        return this._answers;
    }

    /**
     *
     * @param {ChatMessageModel[]} value
     */
    set answers(value) {
        this._answers = value;
    }

    /**
     * Sets the message for the user's question.
     *
     * @param {string} message - The message content for the user's question.
     */
    setQuestionMessage(message) {
        if (!this._question) {
            this._question = new ChatMessageModel();
        }
        this._question.message = message;
    }

    /**
     * Retrieves the message of the user's question.
     *
     * @return {string} - The message content of the user's question.
     */
    getQuestionMessage() {
        return this._question.message;
    }

    /**
     * Converts the instance to a create chat request payload.
     *
     * @return {{question: string}} An object representing the create request payload.
     */
    toCreateChatRequestPayload() {
        return {
            question: this._question.message
        };
    }

    /**
     * Converts the instance to an ask request payload.
     *
     * @return {{conversationId: string, question: string}} An object representing the ask request payload.
     */
    toAskRequestPayload() {
        return {
            conversationId: this._chatId,
            question: this._question.message
        };
    }

    toExplainResponsePayload(messageId) {
        return {
            conversationId: this._chatId,
            messageId
        };
    }
}
