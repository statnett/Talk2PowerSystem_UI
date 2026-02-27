import {cloneDeep} from 'lodash';
import './chat-panel.directive.scss'
import template from './chat-panel.directive.html';
import {ChatItemModel} from '../../../models/chat/chat-item';
import {ChatMessageModel} from '../../../models/chat/chat-message';
import ChatContextServiceModule from '../../../services/chat/chat-context.service';
import {ChatContextEventName} from '../../../services/chat/chat-context-event-name';
import ChatItemDetailModule from '../chat-item-details/chat-item-detail.directive';
import QuestionListModule from "../../question-list/question-list.directive";
import QuestionsContextServiceModule from '../../../services/questions/question-context.service';
import {ChatItemType} from "../../../models/chat/chat-item-type";

let modules = [
    ChatContextServiceModule.name,
    ChatItemDetailModule.name,
    QuestionListModule.name,
    QuestionsContextServiceModule.name
];
const chatPanelModule = angular.module('tt2ps.components.chat.chat-panel', modules);
chatPanelModule.directive('chatPanel', ChatPanelDirective);

ChatPanelDirective.$inject = ['$translate', 'ChatContextService', 'QuestionsContextService'];

/**
 * @ngdoc directive
 * @name tt2ps.components.chat.chat-panel:ChatPanelDirective
 * @description
 *
 * This component displays a chat data.
 *
 * @example
 * <chat-panel></chat-panel>
 */
function ChatPanelDirective($translate, ChatContextService, QuestionsContextService) {

    return {
        template,
        restrict: 'E',
        link: function ($scope, $element) {

            ////////////////////////////
            //  public variables
            ///////////////////////////
            /**
             * @type {ChatModel}
             */
            $scope.chat = undefined;

            /**
             * @type {ChatItemModel}
             */
            $scope.chatItem = undefined;

            /**
             * @type {ChatItemModel}
             */
            $scope.askingChatItem = undefined;

            /**
             * True while a question is being handled. It may involve multiple requests until it turns back to false.
             * @type {boolean}
             */
            $scope.waitingForLastMessage = false;

            ////////////////////////////
            //  public functions
            ///////////////////////////
            /**
             * Handles the ask question action.
             */
            $scope.ask = () => {
                $scope.askingChatItem = cloneDeep($scope.chatItem);
                if ($scope.chat.chatHistory.isEmpty()) {
                    createNewChat($scope.chatItem);
                } else {
                    askQuestion($scope.chatItem);
                }
                $scope.chatItem = getEmptyChatItem();
                scrollToBottom();
                focusQuestionInput();
            };

            /**
             * Regenerates the answer for the provided chat item.
             *
             * @param {ChatItemModel} chatItem - The chat item that contains the question to be regenerated.
             */
            $scope.regenerateQuestion = (chatItem) => {
                const regenerateChatItem = getEmptyChatItem();
                regenerateChatItem.setQuestionMessage(chatItem.getQuestionMessage());
                regenerateChatItem.question.timestamp = Date.now();
                $scope.askingChatItem = regenerateChatItem;
                askQuestion(regenerateChatItem);
                scrollToBottom();
            };

            /**
             * Handles pressing the Enter key in the question input.
             * Will not trigger if `Shift` or `Ctrl` keys are pressed, or if Ask button is disabled.
             *
             * @param {KeyboardEvent} $event - The keyboard event triggered by the user interaction.
             */
            $scope.onKeypressOnInput = ($event) => {
                if (!$scope.askingChatItem && $event.key === 'Enter' && !$event.shiftKey && !$event.ctrlKey) {
                    $scope.ask();
                }
            };

            $scope.onAskHowDeliveredAnswer = () => {
                const askHowDerivedAnswerChatItem = getEmptyChatItem();
                askHowDerivedAnswerChatItem.setQuestionMessage($translate.instant('chat_panel.btn.derive_answer.label'));
                askHowDerivedAnswerChatItem.question.timestamp = Date.now();
                $scope.askingChatItem = cloneDeep(askHowDerivedAnswerChatItem);
                askQuestion(askHowDerivedAnswerChatItem);
                scrollToBottom();
            };

            ////////////////////////////
            //  private functions
            ///////////////////////////
            /**
             *
             * @param {DiagramElementModel} diagramElement
             */
            const onAskForDiagramElement = (diagramElement) => {
                if (diagramElement && !$scope.waitingForLastMessage ) {
                    $scope.chatItem.question.message = `CLICKED_ON ${diagramElement.value}`;
                    $scope.chatItem.type = ChatItemType.DESCRIBE_DIAGRAM_ELEMENT;
                    $scope.ask();
                }
            };

            const createNewChat = (chatItem) => {
                $scope.waitingForLastMessage = true;
                ChatContextService.emit(ChatContextEventName.CREATE_CHAT, chatItem);
            };

            const askQuestion = (chatItem) => {
                $scope.waitingForLastMessage = true;
                ChatContextService.emit(ChatContextEventName.ASK_QUESTION, chatItem);
            };

            const onSelectedChatChanged = (chat) => {
                $scope.chat = chat;
                if ($scope.chat) {
                    initNewChat();
                } else {
                    reset();
                }
            };

            const onSelectedChatUpdated = (chat) => {
                $scope.chat = chat;
                if ($scope.chat) {
                    initNewChat();
                } else {
                    reset();
                }
            };

            const onLastMessageReceived = () => {
                $scope.waitingForLastMessage = false;
            };

            const onQuestionFailure = () => {
                $scope.chatItem = cloneDeep($scope.askingChatItem);
                $scope.askingChatItem = undefined;
                $scope.waitingForLastMessage = false;
            };

            /**
             * Sets the chat item question message from the selected question.
             * @param {QuestionModel} selectedQuestion
             */
            const selectQuestion = (selectedQuestion) => {
                if (selectedQuestion) {
                    $scope.chatItem.question.message = selectedQuestion.question;
                }
            }

            const getEmptyChatItem = () => {
                const chatItem = new ChatItemModel(undefined, new ChatMessageModel());
                if ($scope.chat) {
                    chatItem.chatId = $scope.chat.id;
                }
                return chatItem;
            };

            const focusQuestionInput = () => {
                // Moving focus to the end of the JS call stack with a timeout, because on first Agent select,
                // the dropdown .agent-option steals the focus, or the browser assigns it to the document <body>.
                setTimeout(() => {
                    let inputElement = document.querySelector('.question-input');
                    if (inputElement) {
                        inputElement.focus();
                    }
                });
            }

            const scrollToBottom = () => {
                // Call it in a timeout to ensure that Angular's digest cycle is finished and all elements are displayed.
                setTimeout(() => {
                    const chatDetailsElement = $element[0].querySelector('.chat-details');
                    if (chatDetailsElement) {
                        chatDetailsElement.scrollTop = chatDetailsElement.scrollHeight;
                    }
                });
            };

            const reset = () => {
                $scope.chatItem = getEmptyChatItem();
                $scope.askingChatItem = undefined;
                $scope.waitingForLastMessage = false;
                focusQuestionInput();
            };

            const init = () => {
                initNewChat();
                // Applies the selected question from the QuestionsContextService to the chat item.
                selectQuestion(QuestionsContextService.getSelectedQuestion());
            };

            const initNewChat = () => {
                $scope.chatItem = getEmptyChatItem();
                $scope.askingChatItem = undefined;
                scrollToBottom();
                focusQuestionInput();
            }

            // =========================
            // Subscriptions
            // =========================
            const subscriptions = [];

            const removeAllSubscribers = () => {
                subscriptions.forEach((subscription) => subscription());
            };

            subscriptions.push(ChatContextService.onLastMessageReceived(onLastMessageReceived));
            subscriptions.push(ChatContextService.onSelectedChatChanged(onSelectedChatChanged));
            subscriptions.push(ChatContextService.onSelectedChatUpdated(onSelectedChatUpdated));
            subscriptions.push(ChatContextService.subscribe(ChatContextEventName.ASK_QUESTION_FAILURE, onQuestionFailure));
            subscriptions.push(ChatContextService.subscribe(ChatContextEventName.CREATE_CHAT_FAILURE, onQuestionFailure));
            subscriptions.push(ChatContextService.subscribe(ChatContextEventName.ASK_FOR_DIAGRAM_ELEMENT, onAskForDiagramElement));
            subscriptions.push(QuestionsContextService.onSelectedQuestionChanged(selectQuestion));

            // Deregister the watcher when the scope/directive is destroyed
            $scope.$on('$destroy', () => {
                removeAllSubscribers();
                // Removes the question from the context so that the page is not populated with a question
                // on the next visit unless it is explicitly set.
                QuestionsContextService.clearSelectedQuestion();
            });

            // =========================
            // Initialization
            // =========================
            init();
        }
    }
}

export default chatPanelModule;
