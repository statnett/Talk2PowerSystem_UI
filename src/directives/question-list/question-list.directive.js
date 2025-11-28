import './question-list.directive.scss';
import template from './question-list.directive.html';
import QuestionsContextServiceModule from '../../services/questions/question-context.service';
import {
    QuestionContextEventName as QuestionsContextEventName
} from '../../services/questions/question-context-event-name';
import {QuestionCategoryListModel} from '../../models/questions/question-category-list';
import AccordionModule from '../core/accordion/accordion.directive';

const modules = [
    QuestionsContextServiceModule.name,
    AccordionModule.name
];

const QuestionListModule = angular.module('tt2ps.directives.questions.question-list', modules);

QuestionListModule.directive('questions', QuestionListComponent);

QuestionListComponent.$inject = ['QuestionsContextService'];

/**
 * @module tt2ps.directives.chat.question-list
 * @description
 * This module defines the `questions` directive used to render a list of predefined chat questions.
 * It allows users to select a question, which is then emitted as an event.
 *
 * @example
 * <questions></questions>
 */

function QuestionListComponent(QuestionsContextService) {
    return {
        restrict: 'E',
        template,
        scope: {},
        link: ($scope) => {
            // ==========================
            // Private variables
            // ==========================
            $scope.questionsCategories = undefined;
            const subscriptions = [];

            // =========================
            // Public functions
            // =========================
            /**
             * @param {QuestionModel} selectedQuestion
             */
            $scope.onQuestionSelected = (selectedQuestion) => {
                QuestionsContextService.emit(QuestionsContextEventName.SELECT_QUESTION, selectedQuestion.question);
            };

            // =========================
            // Private functions
            // =========================
            /**
             * @param {QuestionCategoryListModel} questionsCategories
             */
            const onQuestionsChanged = (questionsCategories = new QuestionCategoryListModel()) => {
                $scope.questionsCategories = questionsCategories;
            };

            subscriptions.push(QuestionsContextService.onQuestionsChanged(onQuestionsChanged));

            $scope.$on('$destroy', () => subscriptions.forEach((subscription) => subscription()))
        }
    };
}

export default QuestionListModule;
