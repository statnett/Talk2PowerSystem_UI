export const ChatContextEventName = {

    /**
     * Emitting the "createChat" event triggers a backend request to create a new chat.
     */
    CREATE_CHAT: 'createChat',

    /**
     * This event is emitted when a chat is successfully created.
     */
    CREATE_CHAT_SUCCESSFUL: 'chatCreated',

    /**
     * This event is emitted when the creation of a chat fails.
     */
    CREATE_CHAT_FAILURE: 'chatCreationFailed',

    /**
     * Emitting the "selectChat" event when the selected chat has been changed.
     */
    SELECT_CHAT: 'selectChat',

    /**
     * Emitting the "selectChatUpdated" event when the selected chat has been updated.
     */
    SELECTED_CHAT_UPDATED: 'selectChatUpdated',

    /**
     * Emitting the "lastMessageReceived" event when the final answer message has been received.
     */
    LAST_MESSAGE_RECEIVED: 'lastMessageReceived',

    /**
     * Emitting the "askQuestion" event triggers a request to the backend to retrieve an answer to a question.
     */
    ASK_QUESTION: 'askQuestion',

    /**
     * This event will be emitted when the attempt to answer the question fails.
     */
    ASK_QUESTION_FAILURE: 'askQuestionFailure',

    /**
     * This event is emitted when a user clicks on a diagram element that has an id attribute, allowing us to request additional details from the LLM.
     */
    ASK_FOR_DIAGRAM_ELEMENT: 'askForDiagramElement',

    /**
     * Emitting the "continueChatRun" event triggers a request to the backend to retrieve more remaining answers from the same chat run.
     */
    CONTINUE_CHAT_RUN: 'continueChatRun',

    /**
     * This event will trigger fetching a new explanation of how the answer was generated.
     */
    EXPLAIN_RESPONSE: "explainResponse",

    /**
     * This event will be emitted when the cache with explain responses changed.
     */
    EXPLAIN_RESPONSE_CACHE_UPDATED: "explainResponseCacheUpdated",

    /**
     * This event is emitted when the conversation has expired.
     */
    CONVERSATION_EXPIRED: "conversationExpired",

    /**
     * This event is emitted when a diagram is selected.
     */
    SELECT_DIAGRAM: "selectDiagram",

    /**
     * This event is emitted when the selected diagram has to be displayed in fullscreen.
     */
    SHOW_SELECTED_DIAGRAM_ON_FULLSCREEN: 'showSelectedDiagramOnFullscreen',
};
