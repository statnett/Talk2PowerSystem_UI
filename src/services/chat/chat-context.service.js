import {cloneDeep} from 'lodash';
import EventEmitterModule from '../../services/event-emitter.service'
import {ChatContextEventName} from "./chat-context-event-name";
import {ChatQuestionListModel} from "../../models/chat/chat-question-list";

const ChatContextServiceModule = angular
    .module('tt2ps.services.chat.chats-context', [EventEmitterModule.name]);

ChatContextServiceModule.factory('ChatContextService', ChatContextService);

ChatContextService.$inject = ['EventEmitterService'];


function ChatContextService(EventEmitterService) {

    /**
     * The currently selected in the UI chat which is used for conversation.
     * @type {ChatModel|undefined}
     * @private
     */
    let _selectedChat = undefined;

    /**
     * Stores information about loaded explain responses.
     * The key is the answer ID, and the value is an instance of {@see ExplainResponseModel} that holds the explanation message.
     *
     * @type {{[key: string]: ExplainResponseModel}}
     */
    let _explainCache = {};

    /**
     * @type {ChatQuestionListModel}
     */
    let _chatQuestions = new ChatQuestionListModel();

    /**
     * @return {ChatQuestionListModel}
     */
    const getChatQuestions = () => {
        return cloneDeep(_chatQuestions);
    };

    /**
     * Sets the chat questions with the provided <code>chatQuestions</code> and emits the 'chatQuestionsChanged' event
     * to notify listeners that the chat questions are changed.
     *
     * @param {ChatQuestionListModel} chatQuestions - The chat questions.
     */
    const setChatQuestions = (chatQuestions) => {
        _chatQuestions = cloneDeep(chatQuestions);
        emit(ChatContextEventName.CHAT_QUESTION_CHANGED, getChatQuestions());
    };

    /**
     * Subscribes to the 'chatQuestionsChanged' event.
     * @param {function} callback - The callback to be called when the event is fired.
     *
     * @return {function} unsubscribe function.
     */
    const onChatQuestionsChanged = (callback) => {
        if (angular.isFunction(callback)) {
            callback(getChatQuestions());
        }
        return subscribe(ChatContextEventName.CHAT_QUESTION_CHANGED, (selectedChat) => callback(selectedChat));
    };

    /**
     * @return {ChatModel}
     */
    const getSelectedChat = () => {
        return cloneDeep(_selectedChat);
    };

    /**
     * Updates the selected chat with the provided <code>selectedChat</code> and emits the 'selectChat' event
     * to notify listeners that a new chat has been selected.
     *
     * @param {ChatModel} selectedChat - The chat object to select.
     */
    const selectChat = (selectedChat) => {
        if (!_selectedChat || _selectedChat.id !== selectedChat.id) {
            _selectedChat = cloneDeep(selectedChat);
            emit(ChatContextEventName.SELECT_CHAT, getSelectedChat());
        }
    };

    /**
     * Subscribes to the 'selectChat' event.
     * @param {function} callback - The callback to be called when the event is fired.
     *
     * @return {function} unsubscribe function.
     */
    const onSelectedChatChanged = (callback) => {
        if (angular.isFunction(callback)) {
            callback(getSelectedChat());
        }
        return subscribe(ChatContextEventName.SELECT_CHAT, (selectedChat) => callback(selectedChat));
    };

    /**
     * Updates the selected chat and emits the 'selectChatUpdated' event to notify listeners that a property
     * of the selected chat has changed.
     *
     * If the ID of the passed chat differs from the current selected chat, no action will occur.
     *
     * @param {ChatModel} chat - The chat object that is being updated.
     */
    const updateSelectedChat = (chat) => {
        if (!_selectedChat.id || _selectedChat.id === chat.id) {
            _selectedChat = cloneDeep(chat);
            emit(ChatContextEventName.SELECTED_CHAT_UPDATED, getSelectedChat());
        }
    };

    /** Subscribes to the 'selectChat' event.
     * @param {function} callback - The callback to be called when the event is fired.
     *
     * @return {function} unsubscribe function.
     */
    const onSelectedChatUpdated = (callback) => {
        if (_selectedChat && angular.isFunction(callback)) {
            callback(getSelectedChat());
        }
        return subscribe(ChatContextEventName.SELECTED_CHAT_UPDATED, (selectedChat) => callback(selectedChat));
    };

    /** Subscribes to the 'lastMessageReceived' event.
     * @param {function} callback - The callback to be called when the event is fired.
     *
     * @return {function} unsubscribe function.
     */
    const onLastMessageReceived = (callback) => {
        if (_selectedChat && angular.isFunction(callback)) {
            callback(getSelectedChat());
        }
        return subscribe(ChatContextEventName.LAST_MESSAGE_RECEIVED, (selectedChat) => callback(selectedChat));
    };

    const _getExplainResponseCache = () => {
        return cloneDeep(_explainCache);
    };

    /**
     * Gets the explain response.
     * @param {string} messageId
     * @return {ExplainResponseModel}
     */
    const getExplainResponse = (messageId) => {
        return cloneDeep(_explainCache[messageId]);
    };

    /**
     *  Adds the <code>explainResponse</code> into the explain response cache.
     *
     * @param {ExplainResponseModel} explainResponse
     */
    const addExplainResponseCache = (explainResponse) => {
        _explainCache[explainResponse.messageId] = cloneDeep(explainResponse);
        emit(ChatContextEventName.EXPLAIN_RESPONSE_CACHE_UPDATED, _getExplainResponseCache());
    };

    const hasExplainResponse = (messageId) => {
        return !!_explainCache[messageId];
    };

    const toggleExplainResponse = (messageId) => {
        if (hasExplainResponse(messageId)) {
            _explainCache[messageId].expanded = !_explainCache[messageId].expanded;
            emit(ChatContextEventName.EXPLAIN_RESPONSE_CACHE_UPDATED, _getExplainResponseCache());
        }
    };

    /**
     * Subscribes to the 'explainResponseCacheUpdated' event.
     * @param {function} callback - The callback to be called when the event is fired.
     *
     * @return {function} unsubscribe function.
     */
    const onExplainResponseCacheUpdated = (callback) => {
        if (angular.isFunction(callback)) {
            callback(_getExplainResponseCache());
        }
        return subscribe(ChatContextEventName.EXPLAIN_RESPONSE_CACHE_UPDATED, (explainResponses) => callback(explainResponses));
    };

    /**
     * Emits an event with a deep-cloned payload using the EventEmitterService.
     *
     * @param {string} ChatContextEventName - The name of the event to emit. It must be a value from {@link ChatContextEventName}.
     * @param {*} payload - The data to emit with the event. The payload is deep-cloned before emission.
     */
    const emit = (ChatContextEventName, payload) => {
        EventEmitterService.emitSync(ChatContextEventName, cloneDeep(payload));
    };

    /**
     * Subscribes to an event with the specified callback using the EventEmitterService.
     *
     * @param {string} ChatContextEventName - The name of the event to subscribe to. It must be a value from {@link ChatContextEventName}.
     * @param {function} callback - The function to call when the event is emitted.
     * @return {function} - Returns a function that can be called to unsubscribe from the event.
     */
    const subscribe = (ChatContextEventName, callback) => {
        return EventEmitterService.subscribeSync(ChatContextEventName, (payload) => callback(payload));
    };

    const resetContext = () => {
        _selectedChat = undefined;
        _explainCache = {};
    };

    return {
        resetContext,
        emit,
        subscribe,
        // chats
        getSelectedChat,
        selectChat,
        onSelectedChatChanged,
        updateSelectedChat,
        onSelectedChatUpdated,
        onLastMessageReceived,
        // chat explain
        hasExplainResponse,
        toggleExplainResponse,
        getExplainResponse,
        addExplainResponseCache,
        onExplainResponseCacheUpdated,
        // chat questions
        getChatQuestions,
        setChatQuestions,
        onChatQuestionsChanged
    };
}

export default ChatContextServiceModule;
