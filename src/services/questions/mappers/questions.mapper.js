import {QuestionListModel} from "../../../models/questions/question-list";
import {QuestionModel} from '../../../models/questions/question';

/**
 * Converts the response from the server to a QuestionListModel.
 * @param {*} data
 * @return {QuestionListModel}
 */
export const questionListMapper = (data) => {
    if (!data) {
        return new QuestionListModel();
    }
    return new QuestionListModel(data.map((question) => questionModelMapper(question)));
};

/**
 * Converts the response from the server to a QuestionModel.
 * @param {*} data
 * @return {QuestionModel|undefined}
 */
export const questionModelMapper = (data) => {
    return new QuestionModel(data);
};
