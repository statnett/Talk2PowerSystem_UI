export class ChatMessageModel {
    constructor(data = {}) {

        /**
         * @type {string}
         */
        this._id = data.id;

        /**
         * @type {string}
         */
        this._message = data.message;

        /**
         * @type {number}
         */
        this._timestamp = data.timestamp * 1000;

        /**
         * Holds information about the number of tokens used for this answer, including prompt and completion tokens.
         *
         * @type {TokenUsageInfo}
         */
        this.tokenUsageInfo = data.tokenUsageInfo;

        this.diagrams = data.diagrams || [];
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
    }

    get timestamp() {
        return this._timestamp;
    }

    set timestamp(value) {
        this._timestamp = value;
    }
}
