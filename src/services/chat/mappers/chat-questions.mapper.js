import {ChatQuestionListModel} from "../../../models/chat/chat-question-list";
import {ChatQuestionModel} from "../../../models/chat/chat-question";

/**
 * Converts the response from the server to a ChatQuestionListModel.
 * @param {*} data
 * @return {ChatQuestionListModel}
 */
export const chatQuestionListMapper = (data) => {
    if (!data) {
        return new ChatQuestionListModel();
    }

    return new ChatQuestionListModel(data.questions.map((question) => chatQuestionModelMapper(question)));
};

/**
 * Converts the response from the server to a ChatQuestionModel.
 * @param {*} data
 * @return {ChatQuestionModel|undefined}
 */
export const chatQuestionModelMapper = (data) => {
    if (!data) {
        return;
    }
    return new ChatQuestionModel(data);
};
