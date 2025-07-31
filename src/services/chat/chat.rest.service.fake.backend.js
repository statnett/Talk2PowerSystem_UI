// Delay for askQuestion()
const ASK_DELAY = 2;
const EXPLAIN_DELAY = 2;

export class ChatRestServiceFakeBackend {

    createConversation() {
        const createConversationAnswer = {
            "id": "thread_p9OkI8Z8jbDDeTdBYvgrPEBO",
            "messages": [
                {
                    "id": "msg_J9a0XpvyG7ghTwavV6BK0Q1L",
                    "message": "Han Solo is a fictional character in the Star Wars franchise. He is a smuggler who becomes a hero in the Rebel Alliance.",
                    "usage": {
                        "completionTokens": 32,
                        "promptTokens": 428,
                        "totalTokens": 460
                    }
                }
            ],
            "continueRunId": null,
            "usage": {
                "completionTokens": 32,
                "promptTokens": 428,
                "totalTokens": 460
            }
        }

        return new Promise((resolve) => setTimeout(() => resolve({data: createConversationAnswer}), ASK_DELAY));
        // return new Promise((resolve, reject) => setTimeout(() => reject({status: 400,}), ASK_DELAY));
        // return new Promise((resolve, reject) => setTimeout(() => reject({status: 422,}), ASK_DELAY));
    }

    askQuestion(askRequestData) {
        const answer = {
            id: askRequestData.conversationId,
            messages: [
                {
                    id: "msg_Bn07kVDCYT1qmgu1G7Zw0KNe_" + Date.now(),
                    conversationId: askRequestData.conversationId,
                    message: "Certainly! Here's a random example that incorporates code, JSON, and a SPARQL query:\n\n### Code (Python)\n\n```python\ndef greet(name):\n    return f\"Hello, {name}!\"\n\nprint(greet(\"World\"))\n```\n\n### JSON\n\n```json\n{\n    \"greeting\": \"Hello\",\n    \"target\": \"World\",\n    \"language\": \"English\"\n}\n```\n\n### SPARQL Query\n\n```sparql\nSELECT ?person ?name\nWHERE {\n    ?person a ex:Person .\n    ?person ex:hasName ?name .\n}\nLIMIT 10\n```\n\nThis example demonstrates a simple Python function for greeting, a JSON object representing a greeting structure, and a SPARQL query to retrieve names of persons from a dataset.",
                    "usage": {
                        "completionTokens": 32,
                        "promptTokens": 428,
                        "totalTokens": 460
                    }
                },
                {
                    id: "msg_Bn07kVDCYT1qmgu1G7Zw0KNeс_" + Date.now(),
                    conversationId: askRequestData.conversationId,
                    message: `Reply to '${askRequestData.question}' It seems there was an error with the query. Let me rectify this and try again.`,
                    "usage": {
                        "completionTokens": 32,
                        "promptTokens": 428,
                        "totalTokens": 460
                    }
                }
            ]
        };

        return new Promise((resolve) => setTimeout(() => resolve({data: answer}), ASK_DELAY));
        // return new Promise((resolve, reject) => setTimeout(() => reject({status: 400,}), ASK_DELAY));
        // return new Promise((resolve, reject) => setTimeout(() => reject({status: 422,}), ASK_DELAY));
        // return new Promise((resolve, reject) => setTimeout(() => reject({status: 425,}), ASK_DELAY));
    }

    continueChatRun(data) {
        alert("continueChatRun() not implemented");
    }

    explainResponse(data) {
        const explainResponse = {
            conversationId: data.conversationId,
            messageId: data.messageId,
            queryMethods: [
                 {
                    name: "autocomplete_search",
                    args: "SELECT ?character ?height WHERE { ?character voc:height ?height . FILTER (?character = <https://swapi.co/resource/human/1> || ?character = <https://swapi.co/resource/human/5>) }",
                    query: "SELEdCT ?character ?height WHERE { ?character voc:height ?height . FILTER (?character = <https://swapi.co/resource/human/1> || ?character = <https://swapi.co/resource/human/5>) }",
                    queryType: "sparql",
                    errorOutput: null
                }, {
                    name: "sample_sparql_queries",
                    args: "SELECT ?character ?height WHERE { ?character voc:height ?height . FILTER (?character = <https://swapi.co/resource/human/1> || ?character = <https://swapi.co/resource/human/5>) }",
                    query: "SELEdCT ?character ?height WHERE { ?character voc:height ?height . FILTER (?character = <https://swapi.co/resource/human/1> || ?character = <https://swapi.co/resource/human/5>) }",
                    queryType: "sparql",
                    errorOutput: null
                }, {
                    name: "retrieve_time_series",
                    args: "SELECT ?character ?height WHERE { ?character voc:height ?height . FILTER (?character = <https://swapi.co/resource/human/1> || ?character = <https://swapi.co/resource/human/5>) }",
                    query: "SELEdCT ?character ?height WHERE { ?character voc:height ?height . FILTER (?character = <https://swapi.co/resource/human/1> || ?character = <https://swapi.co/resource/human/5>) }",
                    queryType: "sparql",
                    errorOutput: null
                }, {
                    name: "retrieve_data_points",
                    args: "SELECT ?character ?height WHERE { ?character voc:height ?height . FILTER (?character = <https://swapi.co/resource/human/1> || ?character = <https://swapi.co/resource/human/5>) }",
                    query: "SELEdCT ?character ?height WHERE { ?character voc:height ?height . FILTER (?character = <https://swapi.co/resource/human/1> || ?character = <https://swapi.co/resource/human/5>) }",
                    queryType: "sparql",
                    errorOutput: null
                },
                {
                    name: "sparql_query",
                    args: {
                        external_id: "9bb00faf-0f2f-831a-e040-1e828c94e833_estimated_value",
                        aggregates: [
                            "average",
                            "count"
                        ],
                        granularity: "2days"
                    },
                    query: "SELECT ?character ?name ?height WHERE {\n  ?character a voc:Character;\n             rdfs:label ?name;\n             voc:height ?height.\n  FILTER(?name = \"Luke Skywalker\" || ?name = \"Leia Organa\")\n}",
                    queryType: "sparql",
                    errorOutput: "Error: org.eclipse.rdf4j.query.MalformedQueryException: org.eclipse.rdf4j.query.parser.sparql.ast.VisitorException: QName 'voc:Character' uses an undefined prefix"
                }, {
                    name: "retrieval_search",
                    args: "{\"queries\":[{\"query\":\"pilots that work with Luke Skywalker\",\"filter\":{\"document_id\":\"https://swapi.co/resource/human/1\"},\"top_k\":3}]}",
                    query: "{\n  \"queries\" : [ {\n    \"query\" : \"pilots that work with Luke Skywalker\",\n    \"filter\" : {\n      \"document_id\" : \"https://swapi.co/resource/human/1\"\n    },\n    \"top_k\" : 3\n  } ]\n}",
                    queryType: "json",
                    errorOutput: null
                },
                {
                    name: "iri_discovery",
                    args: "Luke Skywalker",
                    query: "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX onto: <http://www.ontotext.com/>\nSELECT ?label ?iri {\n    ?label onto:fts ('''Luke~ Skywalker~''' '*') .\n    ?iri rdfs:label|skos:prefLabel ?label .\n}",
                    queryType: "sparql",
                    errorOutput: null
                },
                {
                    name: "sparql_query",
                    args: "SELECT ?height WHERE {\n  <https://swapi.co/resource/human/1> voc:height ?height.\n}",
                    query: "SELECT ?height WHERE {\n  <https://swapi.co/resource/human/1> voc:height ?height.\n}",
                    queryType: "sparql",
                    errorOutput: "Error: org.eclipse.rdf4j.query.MalformedQueryException: org.eclipse.rdf4j.query.parser.sparql.ast.VisitorException: QName 'voc:height' uses an undefined prefix"
                },
                {
                    name: "sparql_query",
                    args: "PREFIX voc: <https://swapi.co/vocabulary/>\nSELECT ?name ?height WHERE {\n  ?character voc:height ?height;\n             rdfs:label ?name.\n  FILTER(?name = \"Luke Skywalker\" || ?name = \"Leia Organa\")\n}",
                    query: "PREFIX voc: <https://swapi.co/vocabulary/>\nSELECT ?name ?height WHERE {\n  ?character voc:height ?height;\n             rdfs:label ?name.\n  FILTER(?name = \"Luke Skywalker\" || ?name = \"Leia Organa\")\n}",
                    queryType: "sparql",
                    errorOutput: null
                },
                {
                    name: 'fts_search',
                    args: 'Second Luke',
                    query: 'PREFIX onto: <http://www.ontotext.com/>\nDESCRIBE ?iri {\n\t?x onto:fts \'\'\'Second Luke\'\'\' .\n\t{\n\t\t?x ?p ?iri .\n\t} union {\n\t\t?iri ?p ?x .\n\t}\n}',
                    queryType: "sparql",
                    errorOutput: null
                }, {
                    name: 'similarity_search',
                    args: 'Second Luke',
                    query: 'PREFIX onto: <http://www.ontotext.com/>\nDESCRIBE ?iri {\n\t?x onto:fts \'\'\'Second Luke\'\'\' .\n\t{\n\t\t?x ?p ?iri .\n\t} union {\n\t\t?iri ?p ?x .\n\t}\n}',
                    queryType: "sparql",
                    errorOutput: null
                }, {
                    name: "iri_discovery",
                    args: "Luke Skywalker",
                    query: "PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\nPREFIX skos: <http://www.w3.org/2004/02/skos/core#>\nPREFIX onto: <http://www.ontotext.com/>\nSELECT ?label ?iri {\n    ?label onto:fts ('''Luke~ Skywalker~''' '*') .\n    ?iri rdfs:label|skos:prefLabel ?label .\n}",
                    queryType: "sparql",
                    errorOutput: null
                }, {
                    name: "sparql_query",
                    args: "SELECT ?name ?height WHERE { ?character voc:name ?name ; voc:height ?height . FILTER (?name = 'Luke Skywalker' || ?name = 'Leia Organa') }",
                    query: "SELECT ?name ?height WHERE { ?character voc:name ?name ; voc:height ?height . FILTER (?name = 'Luke Skywalker' || ?name = 'Leia Organa') }",
                    queryType: "sparql",
                    errorOutput: "Error: java.lang.IllegalArgumentException: The following IRIs are not used in the data stored in GraphDB: https://swapi.co/vocabulary/name"
                }, {
                    name: "sparql_query",
                    args: "SELECT ?character ?height WHERE { ?character voc:height ?height . FILTER (?character = <https://swapi.co/resource/human/1> || ?character = <https://swapi.co/resource/human/5>) }",
                    query: "SELEdCT ?character ?height WHERE { ?character voc:height ?height . FILTER (?character = <https://swapi.co/resource/human/1> || ?character = <https://swapi.co/resource/human/5>) }",
                    queryType: "sparql",
                    errorOutput: null
                }, {
                    name: "sparql_query",
                    args: "SELECT ?character ?height WHERE { ?character voc:height ?height . FILTER (?character = <https://swapi.co/resource/human/1> || ?character = <https://swapi.co/resource/human/5>) }",
                    query: "SELEdCT ?character ?height WHERE { ?character voc:height ?height . FILTER (?character = <https://swapi.co/resource/human/1> || ?character = <https://swapi.co/resource/human/5>) }",
                    queryType: "sparql",
                    errorOutput: null
                }
            ]
        };
        return new Promise((resolve) => setTimeout(() => resolve({data: explainResponse}), EXPLAIN_DELAY));
        // return new Promise((resolve, reject) => setTimeout(() => reject({status: 400,}), ASK_DELAY));
        // return new Promise((resolve, reject) => setTimeout(() => reject({status: 422,}), ASK_DELAY));
        // return new Promise((resolve, reject) => setTimeout(() => reject({status: 425,}), ASK_DELAY));
    }
}
