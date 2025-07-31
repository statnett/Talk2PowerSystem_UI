import {ChatItemsListModel} from "./chat-item-list";
import {GeneratorUtils} from "../../services/utils/generator-utils";

export class ChatModel {
    constructor(data = {}) {
        this.hashGenerator = GeneratorUtils.hashCode;

        /**
         * @type {string}
         */
        this._id = data.id;

        /**
         * @type {string}
         */
        this._name = data.name;

        /**
         * @type {number}
         */
        this._timestamp = data.timestamp;

        /**
         * @type {ChatItemsListModel}
         */
        this._chatHistory = data.chatHistory || new ChatItemsListModel();
        this.hash = this.generateHash();
    }

    generateHash() {
        return this.hashGenerator(JSON.stringify(this));
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this.generateHash();
        this._name = value;
    }

    get timestamp() {
        return this._timestamp;
    }

    set timestamp(value) {
        this._timestamp = value;
    }

    get chatHistory() {
        return this._chatHistory;
    }

    set chatHistory(value) {
        this._chatHistory = value || new ChatItemsListModel();
    }
}
