export class ExplainResponseModel {
    constructor(data = {}) {

        /**
         * @type {string}
         */
        this._chatId = data.chatId;

        /**
         * @type {string}
         */
        this._messageId = data.messageId;

        /**
         * @type {ExplainQueryMethodsListModel}
         */
        this._queryMethods = data.queryMethods;

        this._expanded = data.expanded !== undefined ? data.expanded : true;
    }

    get chatId() {
        return this._chatId;
    }

    set chatId(value) {
        this._chatId = value;
    }

    get messageId() {
        return this._messageId;
    }

    set messageId(value) {
        this._messageId = value;
    }

    get queryMethods() {
        return this._queryMethods;
    }

    set queryMethods(value) {
        this._queryMethods = value;
    }

    get expanded() {
        return this._expanded;
    }

    set expanded(value) {
        this._expanded = value;
    }
}
