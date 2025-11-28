import {QuestionListModel} from './question-list';

export class QuestionCategoryModel {
  constructor(data) {
    /**
     * @type {string}
     */
    this.title = data.title || '';

    /**
     * path to svg icon
     * @type {string}
     */
    this.icon = data.icon || '';

    /**
     * @type {QuestionListModel}
     */
    this.questions = data.questions || new QuestionListModel();
  }
}
