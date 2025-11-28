export class QuestionModel {
  constructor(data = {}) {
    /**
     * @type {string}
     */
    this.title = data.title || '';

    /**
     * @type {string}
     */
    this.question = data.question || '';
  }
}
