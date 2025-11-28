import './chat.scss';
import angular from 'angular';
import {ChatModel} from "../../models/chat/chats";
import {ChatContextEventName as ChatEventName, ChatContextEventName} from "../../services/chat/chat-context-event-name";

import chatPanelModule from '../../directives/chat/chat-panel/chat-panel.directive';
import ChatContextServiceModule from '../../services/chat/chat-context.service';
import ChatServiceModule from "../../services/chat/chat.service";
import {ContinueChatRun} from "../../models/chat/chat-answer";
import QuestionsServiceModule from '../../services/questions/questions.service';
import QuestionsContextServiceModule from '../../services/questions/question-context.service';
import {QuestionCategoryListModel} from '../../models/questions/question-category-list';
import SplitterModule from '../../directives/core/splitter/splitter.directive';
import DiagramsSidebarModule from '../../directives/chat/diagrams-sidebar/diagrams-sidebar.directive';

const modules = [
  chatPanelModule.name,
  ChatContextServiceModule.name,
  ChatServiceModule.name,
  QuestionsContextServiceModule.name,
  QuestionsServiceModule.name,
  SplitterModule.name,
  DiagramsSidebarModule.name
];

const ChatModule = angular.module('tt2ps.controllers.chat-ctrl', modules);
ChatModule
    .controller('chatCtrl', ChatCtrl)

ChatCtrl.$inject = [
    '$scope',
    '$translate',
    'ToastrService',
    'ChatService',
    'ChatContextService',
    'QuestionsService',
    'QuestionsContextService'
]

function ChatCtrl($scope, $translate, ToastrService, ChatService, ChatContextService, QuestionsService, QuestionsContextService) {
    // =========================
    // Public variables
    // =========================
    /**
     * @type {boolean} Controls the visibility of the diagram sidebar.
     */
    $scope.showDiagramSidebar = false;

    // =========================
    // Public functions
    // =========================
    /**
     * Toggles the visibility of the diagram sidebar.
     */
    $scope.toggleDiagramSidebar = () => {
        $scope.showDiagramSidebar = !$scope.showDiagramSidebar;
    };

    // =========================
    // Private functions
    // =========================
    /**
     * Initializes the controller state and loads questions.
     */
    const init = () => {
        loadQuestions();
        ChatContextService.selectChat(new ChatModel());
    };

    /**
     * Loads available questions.
     *
     */
    const loadQuestions = () => {
        QuestionsService.getQuestions()
          .then((questions) => {
              QuestionsContextService.setQuestions(questions);
          });
    };

    /**
     * Handles the creation of a new chat after the CREATE_CHAT event.
     *
     * @param {ChatItemModel} chatItem
     */
    const onCreateNewChat = (chatItem) => {
        ChatService.createConversation(chatItem)
          .then((chatAnswer) => {
              ChatContextService.emit(ChatEventName.CREATE_CHAT_SUCCESSFUL, chatAnswer.chatId);

              const selectedChat = ChatContextService.getSelectedChat();
              selectedChat.id = chatAnswer.chatId;
              chatItem.chatId = chatAnswer.chatId;

              updateChatAnswersFirstResponse(selectedChat, chatItem, chatAnswer);
          })
          .catch((error) => {
              handleError(error, ChatEventName.CREATE_CHAT_FAILURE);
          });
    };

    /**
     * Handles asking a question in the selected chat.
     *
     * @param {ChatItemModel} chatItem
     */
    const onAskQuestion = (chatItem) => {
        ChatService.askQuestion(chatItem)
          .then((chatAnswer) => {
              const selectedChat = ChatContextService.getSelectedChat();
              updateChatAnswersFirstResponse(selectedChat, chatItem, chatAnswer);
          })
          .catch((error) => {
              handleError(error, ChatEventName.ASK_QUESTION_FAILURE);
          });
    };

    /**
     * Centralizes error handling logic for chat API requests.
     *
     * @param {Object} error
     * @param {string} eventName
     */
    const handleError = (error, eventName) => {
        const status = error.status;
        ChatContextService.emit(eventName);
        console.error(error);

        if (status === 400) {
            ChatContextService.emit(ChatContextEventName.CONVERSATION_EXPIRED);
        } else if (status === 422) {
            ToastrService.error($translate.instant('chat_panel.error.unprocessable_entity'));
        } else {
            ToastrService.error($translate.instant(`chat_panel.error.${eventName.toLowerCase()}`));
        }
    };

    /**
     * Handles session expiration by resetting the chat and showing an error.
     */
    const onConversationExpired = () => {
        ToastrService.error($translate.instant('chat_panel.error.conversation_not_found'));
        ChatContextService.selectChat(new ChatModel());
    };

    /**
     * Adds first chat response to the history, then processes messages.
     *
     * @param {ChatModel} selectedChat
     * @param {ChatItemModel} chatItem
     * @param {ChatAnswerModel} chatAnswer
     */
    const updateChatAnswersFirstResponse = (selectedChat, chatItem, chatAnswer) => {
        selectedChat.chatHistory.appendItem(chatItem);
        updateChatAnswers(selectedChat, chatItem, chatAnswer);
    };

    /**
     * Updates chat history, processes diagrams, and handles follow-up run continuation.
     *
     * @param {ChatModel} selectedChat
     * @param {ChatItemModel} chatItem
     * @param {ChatAnswerModel} chatAnswer
     */
    const updateChatAnswers = (selectedChat, chatItem, chatAnswer) => {
        selectedChat.timestamp = chatAnswer.timestamp;
        chatItem.answers = chatItem.answers || [];
        chatItem.answers.push(...chatAnswer.messages);
        ChatContextService.updateSelectedChat(selectedChat);

        let lastDiagram;

        chatAnswer.messages.forEach((message) => {
            message.diagrams.forEach((diagram) => {
                lastDiagram = diagram;
            });
        });

        if (lastDiagram) {
            ChatContextService.selectDiagram(lastDiagram);
        }

        if (chatAnswer.continueRunId) {
            ChatContextService.emit(
              ChatContextEventName.CONTINUE_CHAT_RUN,
              new ContinueChatRun(chatItem, chatAnswer.continueRunId)
            );
        } else {
            ChatContextService.emit(ChatContextEventName.LAST_MESSAGE_RECEIVED, selectedChat);
        }
    };

    /**
     * Displays the diagram sidebar whenever a diagram is selected.
     *
     * @param {DiagramModel} diagram
     * @private
     */
    const onSelectedDiagramChanged = (diagram) => {
        if (diagram) {
            $scope.showDiagramSidebar = true;
        }
    };

    // =========================
    // Subscriptions
    // =========================

    /** @type {Function[]} */
    const subscriptions = [];

    /**
     * Unsubscribes from all event listeners and resets questions context.
     *
     * @private
     */
    const removeAllSubscribers = () => {
        subscriptions.forEach((unsubscribe) => unsubscribe());
        QuestionsContextService.setQuestions(new QuestionCategoryListModel());
    };

    subscriptions.push(ChatContextService.subscribe(ChatContextEventName.CREATE_CHAT, onCreateNewChat));
    subscriptions.push(ChatContextService.subscribe(ChatContextEventName.ASK_QUESTION, onAskQuestion));
    subscriptions.push(ChatContextService.subscribe(ChatContextEventName.CONVERSATION_EXPIRED, onConversationExpired));
    subscriptions.push(ChatContextService.subscribe(ChatContextEventName.SELECT_DIAGRAM, onSelectedDiagramChanged));

    $scope.$on('$destroy', removeAllSubscribers);

    // =========================
    // Initialization
    // =========================
    init();
}

export default ChatModule;
