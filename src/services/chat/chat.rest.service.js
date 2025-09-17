import {ChatRestServiceFakeBackend} from './chat.rest.service.fake.backend';
import {DEVELOPMENT} from "../../configurations/app-configurations";

const ChatRestServiceModule = angular
    .module('tt2ps.services.chat.chat-rest-service', []);
ChatRestServiceModule
    .factory('ChatRestService', ChatRestService);

ChatRestService.$inject = ['$http'];

const CONVERSATIONS_ENDPOINT = 'rest/chat/conversations';
const EXPLAIN_RESPONSE_ENDPOINT = `${CONVERSATIONS_ENDPOINT}/explain`;
const LOAD_QUESTIONS_ENDPOINT = 'assets/data/questions.json';

function ChatRestService($http) {

    const _fakeBackend = new ChatRestServiceFakeBackend();

    /**
     * Creates a new conversation.
     * @param {*} data - the data to be sent to the backend
     * @return {Promise<*>}
     */
    const createConversation = (data = {}) => {
        if (DEVELOPMENT) {
            return $http.post(CONVERSATIONS_ENDPOINT, data)
                .catch(() => {
                    return _fakeBackend.createConversation(data);
                });
        }
        return $http.post(CONVERSATIONS_ENDPOINT, data);
    };

    /**
     * Calls the REST API to ask a question.
     * @param {*} data
     * @return {*}
     */
    const askQuestion = (data) => {
        if (DEVELOPMENT) {
            return $http.post(CONVERSATIONS_ENDPOINT, data)
                .catch(() => {
                    return _fakeBackend.askQuestion(data);
                });
        }
        return $http.post(`${CONVERSATIONS_ENDPOINT}`, data);
    };

    /**
     * Calls the REST API to continue a chat run.
     * @param {*} data
     * @return {*}
     */
    const continueChatRun = (data) => {
        if (DEVELOPMENT) {
            return _fakeBackend.continueChatRun(data);
        }
        return $http.post(`${CONVERSATIONS_ENDPOINT}/continue`, data);
    };

    /**
     * Calls backend server to fetch an explanation of how the answer was generated.
     * @param {*} data
     * @return {Promise}
     */
    const explainResponse = (data = {}) => {
        if (DEVELOPMENT) {
            return $http.post(EXPLAIN_RESPONSE_ENDPOINT, data)
                .catch(() => {
                    return _fakeBackend.explainResponse(data);
                });
        }
        return $http.post(EXPLAIN_RESPONSE_ENDPOINT, data);
    };

    const getChatQuestions = () => {
        return $http.get(LOAD_QUESTIONS_ENDPOINT);
    };

    return {
        createConversation,
        askQuestion,
        continueChatRun,
        explainResponse,
        getChatQuestions
    };
}

export default ChatRestServiceModule;
