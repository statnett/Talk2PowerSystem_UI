const QuestionsRestServiceModule = angular
  .module('tt2ps.services.chat.questions-rest-service', []);

QuestionsRestServiceModule
  .factory('QuestionsRestService', QuestionsRestService);

QuestionsRestService.$inject = ['$http'];

const LOAD_QUESTIONS_ENDPOINT = 'assets/data/questions.yaml';

function QuestionsRestService($http) {

  const getQuestions = () => {
    return $http.get(LOAD_QUESTIONS_ENDPOINT);
  };

  return {
    getQuestions
  };
}

export default QuestionsRestServiceModule;
