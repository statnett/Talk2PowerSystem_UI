import angular from 'angular';
import ChatQuestionListModule from "./directives/chat/chat-question-list/chat-question-list.directive";

export default angular.module('tt2ps.controllers.mainCtrl', [,
    ChatQuestionListModule.name])
    .controller('mainCtrl', () => {
        // This controller is loaded when the application starts.
        // Its purpose is to hold global properties or functions
        // relevant to all pages, if needed.
    });
