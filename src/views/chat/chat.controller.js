import './chat.scss';
import angular from 'angular';
import {ChatModel} from "../../models/chat/chats";
import {ChatContextEventName as ChatEventName, ChatContextEventName} from "../../services/chat/chat-context-event-name";

import chatPanelModule from '../../directives/chat/chat-panel/chat-panel.directive';
import ChatContextServiceModule from '../../services/chat/chat-context.service';
import ChatServiceModule from "../../services/chat/chat.service";
import {ContinueChatRun} from "../../models/chat/chat-answer";

const modules = [
    chatPanelModule.name,
    ChatContextServiceModule.name,
    ChatServiceModule.name
];

const ChatModule = angular
    .module('tt2ps.chat.controllers.chat-ctrl', modules);
ChatModule
    .controller('chatCtrl', ChatCtrl)

ChatCtrl.$inject = [
    '$scope',
    '$translate',
    'toastr',
    'ChatService',
    'ChatContextService'
]

function ChatCtrl($scope, $translate, toastr, ChatService, ChatContextService) {
    const init = () => {
        loadChatQuestionList();
        ChatContextService.selectChat(new ChatModel());
    }

    const loadChatQuestionList = () => {
        return ChatService.getChatQuestions()
            .then((chatQuestions) => {
                ChatContextService.setChatQuestions(chatQuestions);
            });
    }

    /**
     * @param {ChatItemModel} chatItem
     */
    const onCreateNewChat = (chatItem) => {
        ChatService.createConversation(chatItem)
            .then((chatAnswer) => {
                ChatContextService.emit(ChatEventName.CREATE_CHAT_SUCCESSFUL, chatAnswer.chatId);
                const selectedChat = ChatContextService.getSelectedChat();
                selectedChat.id = chatAnswer.chatId;
                chatItem.chatId = chatAnswer.chatId;

                // Process the messages
                updateChatAnswersFirstResponse(selectedChat, chatItem, chatAnswer);
            })
            .catch((error) => {
                const status = error.status;
                ChatContextService.emit(ChatEventName.CREATE_CHAT_FAILURE);
                console.error(error);
                if (status === 400) {
                    toastr.error($translate.instant('chat_panel.error.conversation_not_found'));
                } else if (status === 422) {
                    toastr.error($translate.instant('chat_panel.error.unprocessable_entity'));
                } else {
                    toastr.error($translate.instant('chat_panel.error.create_chat_failure'));
                }
            });
    };

    const onAskQuestion = (chatItem) => {
        ChatService.askQuestion(chatItem)
            .then((chatAnswer) => {
                const selectedChat = ChatContextService.getSelectedChat();
                updateChatAnswersFirstResponse(selectedChat, chatItem, chatAnswer);
            })
            .catch((error) => {
                const status = error.status;
                ChatContextService.emit(ChatEventName.ASK_QUESTION_FAILURE);
                console.error(error);
                if (status === 400) {
                    toastr.error($translate.instant('chat_panel.error.conversation_not_found'));
                } else if (status === 422) {
                    toastr.error($translate.instant('chat_panel.error.unprocessable_entity'));
                } else {
                    toastr.error($translate.instant('chat_panel.error.ask_question_failure'));
                }
            });
    }

    const updateChatAnswersFirstResponse = (selectedChat, chatItem, chatAnswer) => {
        selectedChat.chatHistory.appendItem(chatItem);
        updateChatAnswers(selectedChat, chatItem, chatAnswer);
    };

    const updateChatAnswers = (selectedChat, chatItem, chatAnswer) => {
        selectedChat.timestamp = chatAnswer.timestamp;
        chatItem.answers = chatItem.answers || [];
        chatItem.answers.push(...chatAnswer.messages);
        ChatContextService.updateSelectedChat(selectedChat);

        if (chatAnswer.continueRunId) {
            ChatContextService.emit(ChatContextEventName.CONTINUE_CHAT_RUN,
                new ContinueChatRun(chatItem, chatAnswer.continueRunId));
        } else {
            ChatContextService.emit(ChatContextEventName.LAST_MESSAGE_RECEIVED, selectedChat);
        }
    };

    // =========================
    // Subscriptions
    // =========================
    const subscriptions = [];

    const removeAllSubscribers = () => {
        subscriptions.forEach((subscription) => subscription());
    };

    subscriptions.push(ChatContextService.subscribe(ChatContextEventName.CREATE_CHAT, onCreateNewChat));
    subscriptions.push(ChatContextService.subscribe(ChatContextEventName.ASK_QUESTION, onAskQuestion));

    // Deregister the watcher when the scope/directive is destroyed
    $scope.$on('$destroy', removeAllSubscribers);

    // =========================
    // Initialization
    // =========================
    init();
}

export default ChatModule;
