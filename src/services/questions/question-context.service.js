import {cloneDeep} from 'lodash';
import EventEmitterModule from '../../services/event-emitter.service'
import {QuestionContextEventName} from './question-context-event-name';
import {QuestionCategoryListModel} from '../../models/questions/question-category-list';

const QuestionsContextServiceModule = angular
  .module('tt2ps.services.questions.question-context', [EventEmitterModule.name]);

QuestionsContextServiceModule.factory('QuestionsContextService', QuestionsContextService);

QuestionsContextService.$inject = ['EventEmitterService'];


function QuestionsContextService(EventEmitterService) {

  /**
   * @type {QuestionCategoryListModel}
   */
  let _questions = new QuestionCategoryListModel();

  /**
   * Holds the currently selected question, if any.
   * @type {QuestionModel|undefined}
   */
  let _selectedQuestion = undefined;

  /**
   * Returns the last selected question, if any.
   *
   * @returns {QuestionModel|undefined}
   */
  const getSelectedQuestion = () => {
    return cloneDeep(_selectedQuestion);
  }

  /**
   * Sets the selected question and emits the 'selectedQuestionChanged' event
   * to notify listeners that the selected chat question has changed.
   *
   * @param {QuestionModel} question - The newly selected question.
   */
  const setSelectedQuestion = (question) => {
    _selectedQuestion = cloneDeep(question);
    emit(QuestionContextEventName.SELECTED_QUESTION_CHANGED, getSelectedQuestion());
  };

  /**
   * Clears the selected question from the context.
   */
  const clearSelectedQuestion = () => {
    setSelectedQuestion(undefined);
  }

  /**
   * Subscribes to the 'selectedQuestionChanged' event.
   *
   * The callback is immediately invoked with the current selected question,
   * if one exists.
   *
   * @param {Function} callback - Called when the selected question changes.
   * @returns {Function} Unsubscribe function.
   */
  const onSelectedQuestionChanged = (callback) => {
    if (angular.isFunction(callback)) {
      callback(getSelectedQuestion());
    }
    return subscribe(QuestionContextEventName.SELECTED_QUESTION_CHANGED, (selectedQuestion) => callback(selectedQuestion));
  };

  /**
   * @return {QuestionCategoryListModel}
   */
  const getQuestions = () => {
    return cloneDeep(_questions);
  };

  /**
   * Sets the chat questions with the provided <code>questions</code> and emits the 'questionsChanged' event
   * to notify listeners that the chat questions are changed.
   *
   * @param {QuestionCategoryListModel} questions - The chat questions.
   */
  const setQuestions = (questions) => {
    _questions = cloneDeep(questions);
    emit(QuestionContextEventName.QUESTION_CHANGED, getQuestions());
  };

  /**
   * Subscribes to the 'questionsChanged' event.
   * @param {function} callback - The callback to be called when the event is fired.
   *
   * @return {function} unsubscribe function.
   */
  const onQuestionsChanged = (callback) => {
    if (angular.isFunction(callback)) {
      callback(getQuestions());
    }
    return subscribe(QuestionContextEventName.QUESTION_CHANGED, (selectedChat) => callback(selectedChat));
  };

  /**
   * Emits an event with a deep-cloned payload using the EventEmitterService.
   *
   * @param {string} ChatContextEventName - The name of the event to emit. It must be a value from {@link QuestionContextEventName}.
   * @param {*} payload - The data to emit with the event. The payload is deep-cloned before emission.
   */
  const emit = (ChatContextEventName, payload) => {
    EventEmitterService.emitSync(ChatContextEventName, cloneDeep(payload));
  };

  /**
   * Subscribes to an event with the specified callback using the EventEmitterService.
   *
   * @param {string} ChatContextEventName - The name of the event to subscribe to. It must be a value from {@link QuestionContextEventName}.
   * @param {function} callback - The function to call when the event is emitted.
   * @return {function} - Returns a function that can be called to unsubscribe from the event.
   */
  const subscribe = (ChatContextEventName, callback) => {
    return EventEmitterService.subscribeSync(ChatContextEventName, (payload) => callback(payload));
  };

  return {
    emit,
    subscribe,
    getQuestions,
    setQuestions,
    onQuestionsChanged,
    getSelectedQuestion,
    setSelectedQuestion,
    clearSelectedQuestion,
    onSelectedQuestionChanged
  };
}

export default QuestionsContextServiceModule;
