import './chat-question-list.directive.scss';
import template from './chat-question-list.directive.html';
import ChatContextService from "../../../services/chat/chat-context.service";
import {ChatContextEventName} from "../../../services/chat/chat-context-event-name";

const modules = [
    ChatContextService.name
];

const ChatQuestionListModule = angular
    .module('tt2ps.directives.chat.chat-question-list', modules);
ChatQuestionListModule
    .directive('chatQuestions', ChatQuestionListComponent);

ChatQuestionListComponent.$inject = ['ChatContextService'];

/**
 * @module tt2ps.directives.chat.chat-question-list
 * @description
 * This module defines the `chatQuestions` directive used to render a list of predefined chat questions.
 * It allows users to select a question, which is then emitted as an event.
 *
 * @example
 * <chat-questions></chat-questions>
 */

function ChatQuestionListComponent(ChatContextService) {
    return {
        restrict: 'E',
        template,
        scope: {},
        link: ($scope) => {
            // ==========================
            // Private variables
            // ==========================
            $scope.questions = undefined;
            const subscriptions = [];

            // =========================
            // Public functions
            // =========================
            $scope.onQuestionSelected = (question) => {
                ChatContextService.emit(ChatContextEventName.SELECT_CHAT_QUESTION, question);
            };

            // =========================
            // Private functions
            // =========================
            const onChatQuestionsChanged = (questions) => {
                console.log(questions);
                $scope.questions = questions;
            };

            subscriptions.push(ChatContextService.onChatQuestionsChanged(onChatQuestionsChanged));

            $scope.$on('$destroy', () => subscriptions.forEach((subscription) => subscription()))
        }
    };
}

export default ChatQuestionListModule;
