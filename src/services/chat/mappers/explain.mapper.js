import {ExplainResponseModel} from "../../../models/chat/explain-response";
import {ExplainQueryMethodsListModel} from "../../../models/chat/explain-query-mothods-list";
import {ExplainQueryMethodModel} from "../../../models/chat/explain-query-method";

/**
 * Converts the response from the server to a ExplainResponseModel.
 *
 * @param {*} data
 * @return {ExplainResponseModel}
 */
export const explainResponseMapper = (data) => {
    return new ExplainResponseModel({
        chatId: data.conversationId,
        messageId: data.messageId,
        queryMethods: explainQueryMethodsListMapper(data.queryMethods)
    });
};

/**
 * Converts the response from the server to a ExplainQueryMethodsListModel.
 *
 * @param {*} data
 * @return {ExplainQueryMethodsListModel}
 */
export const explainQueryMethodsListMapper = (data = []) => {
    return new ExplainQueryMethodsListModel(data.map(explainQueryMethodMapper));
};

/**
 * Converts the response from the server to a ExplainQueryMethodModel.
 *
 * @param {*} data
 * @return {ExplainQueryMethodModel}
 */
export const explainQueryMethodMapper = (data) => {
    return new ExplainQueryMethodModel(data);
};
