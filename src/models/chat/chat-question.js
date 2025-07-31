export class ChatQuestionModel {
    constructor(question = '') {
        this._question = question
    }

    get question() {
        return this._question;
    }

    set question(value) {
        this._question = value;
    }
}
