import {QuestionCategoryListModel} from '../../../models/questions/question-category-list';
import {questionCategoryMapper} from './question-category.mapper';

export const questionsCategoriesMapper = (rawQuestionsCategories = []) => {
  return new QuestionCategoryListModel(rawQuestionsCategories.items.map(questionCategoryMapper));
}
