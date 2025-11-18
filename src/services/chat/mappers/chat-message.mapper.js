import {ChatAnswerModel} from "../../../models/chat/chat-answer";
import {ChatMessageModel} from "../../../models/chat/chat-message";
import {DiagramTypes} from '../../../models/chat/diagrams/diagram-types';
import {ImageDiagramModel} from '../../../models/chat/diagrams/image-diagram';
import {FrameDiagramModel} from '../../../models/chat/diagrams/frame-diagram';
import {SvgDiagramModel} from '../../../models/chat/diagrams/svg-diagram';

/**
 * Converts the response from the server to a list of ChatMessageModel array.
 * @param {*[]} data
 * @return {ChatMessageModel[]}
 */
export const chatMessageModelListMapper = (data) => {
    if (!data) {
        return [];
    }
    return data.map((chatMessage) => chatMessageModelMapper(chatMessage));
};

/**
 * Converts the response from the server to a ChatMessageModel.
 * @param {*} data
 * @return {ChatMessageModel|undefined}
 */
export const chatMessageModelMapper = (data) => {
    if (!data) {
        return;
    }
    return new ChatMessageModel({
        id: data.id,
        role: data.role,
        message: data.message,
        timestamp: data.timestamp,
        tokenUsageInfo: data.usage,
        data: data,
        diagrams: diagramModelListMapper(data.graphics)
    });
};

/**
 * Converts the response from the server to a ChatAnswerModel instance.
 * @param {*} data
 * @return {ChatAnswerModel|undefined}
 */
export const chatAnswerModelMapper = (data) => {
    if (!data) {
        return;
    }
    return new ChatAnswerModel({
        chatId: data.id,
        messages: chatMessageModelListMapper(data.messages),
        continueRunId: data.continueRunId,
        tokenUsageInfo: data.usage,
    });
};

export const diagramModelListMapper = (data = []) => {
  return data.map((diagram) => diagramModelMapper(diagram));
}

export const diagramModelMapper = (data = {}) => {
  switch (data.type) {
    case DiagramTypes.SVG:
      return new SvgDiagramModel(data);
      case DiagramTypes.IMAGE:
        return new ImageDiagramModel(data);
    default:
      return new FrameDiagramModel(data);
  }
}
