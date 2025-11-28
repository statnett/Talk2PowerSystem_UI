import QuestionsRestServiceModule from './questions.rest.service';
import {questionsCategoriesMapper} from './mappers/questions-categories.mapper';
import YAML from 'yaml';

const modules = [
  QuestionsRestServiceModule.name
];

const QuestionsServiceModule = angular.module('tt2ps.services.chat.question-service', modules);

QuestionsServiceModule.factory('QuestionsService', QuestionsService);

QuestionsService.$inject = ['QuestionsRestService'];

function QuestionsService(QuestionsRestService) {
  const getQuestions = () => {
    return QuestionsRestService.getQuestions()
      .then((response) => {
        return questionsCategoriesMapper(YAML.parse(response.data));
      });
  }

  return {
    getQuestions
  };
}

export default QuestionsServiceModule;
