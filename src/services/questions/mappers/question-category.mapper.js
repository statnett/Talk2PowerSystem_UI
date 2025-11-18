import {QuestionCategoryModel} from '../../../models/questions/question-category';
import {questionListMapper} from './questions.mapper';

export const questionCategoryMapper = (data = {}) => {
    return new QuestionCategoryModel({
      title: data.title,
      icon: data.icon,
      questions: questionListMapper(data.questions)
    });
}
