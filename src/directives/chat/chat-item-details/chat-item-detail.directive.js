import './chat-item-details.directive.scss';
import template from './chat-item-detail.directive.html'
import {ExplainQueryType} from "../../../models/chat/explain-query-type";
import MarkdownServiceModule from "../../../services/markdown/markdown.service";
import MarkdownContentModule from "../../core/markdown-content/markdown-content.directive";
import TokensUsageInfoModule from "../token-usage-popover/token-usage-popover.directive";

const modules = [
    MarkdownServiceModule.name,
    MarkdownContentModule.name,
    TokensUsageInfoModule.name
];

const ChatItemDetailModule = angular
    .module('tt2ps.directives.chat.chat-item-detail', modules)
    .directive('chatItemDetail', ChatItemDetailDirective);

ChatItemDetailDirective.$inject = ['toastr', '$translate', 'ChatContextService', 'ChatService', '$filter'];

/**
 * @ngdoc directive
 * @name tt2ps.directives.chat.chat-item-detail:ChatItemDetailDirective
 * @restrict E
 * @description
 *
 * This directive represents a component that displays a chat data.
 *
 * @example
 * <chat-item-detail chat-item-details="chatItemDetail"></chat-item-detail>
 */
function ChatItemDetailDirective(toastr, $translate, ChatContextService, ChatService, $filter) {
    return {
        restrict: 'E',
        template,
        scope: {
            chatItemDetail: '=',
            showActions: '=',
            asking: '=',
            disabled: '=',
            onRegenerateQuestion: '&',
            onAskHowDeliveredAnswer: '&'
        },
        link: ($scope) => {

            // =========================
            // Public variables
            // =========================

            $scope.ExplainQueryType = ExplainQueryType;
            $scope.markdownContentOptions = undefined;

            /**
             * @type {{[key: string]: ExplainResponseModel}}
             */
            $scope.explainResponseModel = {};

            /**
             * Mapping of answer id to a boolean value indicating whether the explanation of how the answer was
             * generated is being loaded.
             * @type {{[key: string]: boolean}}
             */
            $scope.loadingExplainResponse = {};

            // =========================
            // Private variables
            // =========================

            // =========================
            // Public functions
            // =========================
            $scope.regenerateQuestion = () => {
                $scope.onRegenerateQuestion({chatItem: $scope.chatItemDetail});
            };

            /**
             * Extract the explanation of how the answer was generated.
             * @param {string} messageId
             */
            $scope.explainResponse = (messageId) => {
                if (ChatContextService.hasExplainResponse(messageId)) {
                    ChatContextService.toggleExplainResponse(messageId);
                } else {
                    $scope.loadingExplainResponse[messageId] = true;
                    ChatService.explainResponse($scope.chatItemDetail, messageId)
                        .then((explainResponse) => {
                            ChatContextService.addExplainResponseCache(explainResponse);
                        })
                        .catch((error) => {
                            if (error.status === 400) {
                                toastr.error($translate.instant('chat_panel.error.conversation_not_found'));
                            } else if (error.status === 422) {
                                toastr.error($translate.instant('chat_panel.error.unprocessable_entity'));
                            } else {
                                toastr.error($translate.instant('chat_panel.messages.explain_response_failure'));
                            }
                        })
                        .finally(() => $scope.loadingExplainResponse[messageId] = false);
                }
            };

            /**
             * Triggers an asking how the answer was generated.
             */
            $scope.onAskHowAnswerWasDerived = () => {
                $scope.onAskHowDeliveredAnswer();
            };

            /**
             * Handles the click event on the token usage info button.
             * No additional actions are needed at this time; the handler simply prevents
             * the default button behavior and stops the event from bubbling up.
             *
             * @param {Event} event - The click event object.
             */
            $scope.onTokenUsageInfo = (event) => {
                event.preventDefault();
                event.stopPropagation();
            };

            // =========================
            // Private functions
            // =========================
            const init = () => {
                $scope.markdownContentOptions = {};
                updateExplainResponseModel();
            };

            const onExplainResponseCacheUpdated = () => {
                updateExplainResponseModel();
            };

            const updateExplainResponseModel = () => {
                $scope.chatItemDetail.answers.forEach((answer) => {
                    $scope.explainResponseModel[answer.id] = ChatContextService.getExplainResponse(answer.id);
                });
            };

            // =========================
            // Subscriptions
            // =========================
            const subscriptions = [];

            const removeAllSubscribers = () => {
                subscriptions.forEach((subscription) => subscription());
            };

            subscriptions.push(ChatContextService.onExplainResponseCacheUpdated(onExplainResponseCacheUpdated));

            // Deregister the watcher when the scope/directive is destroyed
            $scope.$on('$destroy', removeAllSubscribers);

            // =========================
            // Initialization
            // =========================
            init();
        }
    };
}

export default ChatItemDetailModule;
