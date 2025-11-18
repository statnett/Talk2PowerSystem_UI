// Delay for askQuestion()
const ASK_DELAY = 2;
const EXPLAIN_DELAY = 2;
const CONFIGURATION_DELAY = 2;

export class ChatRestServiceFakeBackend {

    createConversation() {
        const createConversationAnswer = {
            "id": "thread_p9OkI8Z8jbDDeTdBYvgrPEBO",
            "messages": [
                {
                    "id": "msg_J9a0XpvyG7ghTwavV6BK0Q1L",
                    "message": "Han Solo is a fictional character in the Star Wars franchise. He is a smuggler who becomes a hero in the Rebel Alliance.",
                    graphics: [
                      {
                        type: "svg",
                        svg: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 800 300\" width=\"800\" height=\"300\" role=\"img\" aria-labelledby=\"title desc\">\n" +
                          "  <title id=\"title\">High voltage transformer diagram</title>\n" +
                          "  <desc id=\"desc\">Simple diagram showing high-voltage line, disconnect, transformer (primary and secondary coils) and low-voltage line with labels.</desc>\n" +
                          "\n" +
                          "  <!-- background grid faint (optional) -->\n" +
                          "  <rect width=\"100%\" height=\"100%\" fill=\"#fff\"/>\n" +
                          "\n" +
                          "  <!-- High-voltage bus -->\n" +
                          "  <line x1=\"40\" y1=\"70\" x2=\"280\" y2=\"70\" stroke=\"#2b2b2b\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n" +
                          "  <text x=\"20\" y=\"50\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#222\">High Voltage</text>\n" +
                          "  <text x=\"20\" y=\"85\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#444\">110 kV</text>\n" +
                          "\n" +
                          "  <!-- HV insulator (three stacked) -->\n" +
                          "  <g transform=\"translate(200,70)\">\n" +
                          "    <line x1=\"0\" y1=\"0\" x2=\"0\" y2=\"40\" stroke=\"#2b2b2b\" stroke-width=\"3\"/>\n" +
                          "    <rect x=\"-10\" y=\"40\" width=\"20\" height=\"6\" fill=\"#999\" rx=\"2\"/>\n" +
                          "    <rect x=\"-10\" y=\"50\" width=\"20\" height=\"6\" fill=\"#999\" rx=\"2\"/>\n" +
                          "    <rect x=\"-10\" y=\"60\" width=\"20\" height=\"6\" fill=\"#999\" rx=\"2\"/>\n" +
                          "  </g>\n" +
                          "\n" +
                          "  <!-- Disconnect switch symbol -->\n" +
                          "  <g transform=\"translate(270,70)\">\n" +
                          "    <line x1=\"0\" y1=\"0\" x2=\"40\" y2=\"-30\" stroke=\"#2b2b2b\" stroke-width=\"3\"/>\n" +
                          "    <line x1=\"40\" y1=\"-30\" x2=\"80\" y2=\"-30\" stroke=\"#2b2b2b\" stroke-width=\"3\"/>\n" +
                          "    <circle cx=\"80\" cy=\"-30\" r=\"4\" fill=\"#2b2b2b\"/>\n" +
                          "    <text x=\"270\" y=\"40\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#444\">Disconnect</text>\n" +
                          "  </g>\n" +
                          "\n" +
                          "  <!-- Transformer core -->\n" +
                          "  <g transform=\"translate(360,110)\">\n" +
                          "    <!-- core legs -->\n" +
                          "    <rect x=\"-10\" y=\"-20\" width=\"20\" height=\"120\" fill=\"#bdbdbd\" rx=\"3\"/>\n" +
                          "    <rect x=\"70\" y=\"-20\" width=\"20\" height=\"120\" fill=\"#bdbdbd\" rx=\"3\"/>\n" +
                          "    <rect x=\"30\" y=\"30\" width=\"20\" height=\"20\" fill=\"#bdbdbd\" rx=\"2\"/>\n" +
                          "    <!-- primary coil (left) -->\n" +
                          "    <g transform=\"translate(-30,20)\">\n" +
                          "      <text x=\"-10\" y=\"-10\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#222\">Primary</text>\n" +
                          "      <g stroke=\"#2b6fb3\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\">\n" +
                          "        <path d=\"M10 0 q10 -20 20 0 q10 -20 20 0 q10 -20 20 0\" />\n" +
                          "      </g>\n" +
                          "    </g>\n" +
                          "    <!-- secondary coil (right) -->\n" +
                          "    <g transform=\"translate(120,20)\">\n" +
                          "      <text x=\"-10\" y=\"-10\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#222\">Secondary</text>\n" +
                          "      <g stroke=\"#2b8f2b\" stroke-width=\"3\" fill=\"none\" stroke-linecap=\"round\">\n" +
                          "        <path d=\"M0 0 q10 -20 20 0 q10 -20 20 0\" />\n" +
                          "      </g>\n" +
                          "    </g>\n" +
                          "    <!-- connecting lines from coils to core -->\n" +
                          "    <line x1=\"0\" y1=\"35\" x2=\"30\" y2=\"35\" stroke=\"#2b6fb3\" stroke-width=\"3\"/>\n" +
                          "    <line x1=\"160\" y1=\"35\" x2=\"130\" y2=\"35\" stroke=\"#2b8f2b\" stroke-width=\"3\"/>\n" +
                          "  </g>\n" +
                          "\n" +
                          "  <!-- LV bus -->\n" +
                          "  <line x1=\"560\" y1=\"70\" x2=\"760\" y2=\"70\" stroke=\"#2b2b2b\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n" +
                          "  <text x=\"650\" y=\"50\" font-family=\"sans-serif\" font-size=\"14\" fill=\"#222\">Low Voltage</text>\n" +
                          "  <text x=\"650\" y=\"85\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#444\">10 kV</text>\n" +
                          "\n" +
                          "  <!-- LV ground / neutral -->\n" +
                          "  <g transform=\"translate(660,120)\">\n" +
                          "    <line x1=\"0\" y1=\"-50\" x2=\"0\" y2=\"0\" stroke=\"#2b2b2b\" stroke-width=\"2\"/>\n" +
                          "    <line x1=\"-12\" y1=\"0\" x2=\"12\" y2=\"0\" stroke=\"#2b2b2b\" stroke-width=\"3\"/>\n" +
                          "    <line x1=\"-8\" y1=\"8\" x2=\"8\" y2=\"8\" stroke=\"#2b2b2b\" stroke-width=\"2\"/>\n" +
                          "    <line x1=\"-4\" y1=\"16\" x2=\"4\" y2=\"16\" stroke=\"#2b2b2b\" stroke-width=\"2\"/>\n" +
                          "    <text x=\"-28\" y=\"40\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#444\">Ground / Neutral</text>\n" +
                          "  </g>\n" +
                          "\n" +
                          "  <!-- arrows showing direction -->\n" +
                          "  <defs>\n" +
                          "    <marker id=\"arrow\" markerWidth=\"10\" markerHeight=\"10\" refX=\"6\" refY=\"5\" orient=\"auto\">\n" +
                          "      <path d=\"M0 0 L10 5 L0 10 z\" fill=\"#555\"/>\n" +
                          "    </marker>\n" +
                          "  </defs>\n" +
                          "  <line x1=\"120\" y1=\"160\" x2=\"680\" y2=\"160\" stroke=\"#777\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\" marker-end=\"url(#arrow)\"/>\n" +
                          "  <text x=\"350\" y=\"150\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#666\">Power flow</text>\n" +
                          "\n" +
                          "  <!-- Legend -->\n" +
                          "  <rect x=\"20\" y=\"200\" width=\"220\" height=\"80\" fill=\"#fff\" stroke=\"#ddd\" rx=\"6\"/>\n" +
                          "  <text x=\"30\" y=\"220\" font-family=\"sans-serif\" font-size=\"13\" fill=\"#222\">Legend</text>\n" +
                          "  <line x1=\"35\" y1=\"235\" x2=\"75\" y2=\"235\" stroke=\"#2b6fb3\" stroke-width=\"3\"/>\n" +
                          "  <text x=\"85\" y=\"240\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#444\">Primary coil (HV)</text>\n" +
                          "  <line x1=\"35\" y1=\"257\" x2=\"75\" y2=\"257\" stroke=\"#2b8f2b\" stroke-width=\"3\"/>\n" +
                          "  <text x=\"85\" y=\"262\" font-family=\"sans-serif\" font-size=\"12\" fill=\"#444\">Secondary coil (LV)</text>\n" +
                          "\n" +
                          "</svg>\n"
                    }
                    ],
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
                    graphics: [{
                        type: "image",
                        url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"
                    },
                        {
                        type: "frame",
                        url: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg"
                    }, {
                        type: "frame",
                        url: "https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&amp;layer=mapnik"
                    }],
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
                    graphics: [
                        {
                            type: "frame",
                            url: "https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&amp;layer=mapnik"
                        }
                    ],
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

    continueChatRun() {
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

    getConfiguration() {
        const securityConfig = {
            enabled: false,
            clientId: '<client_id>',
            frontendAppClientId: '<frontendAppClientId>',
            scopes: ['openid', 'profile'],
            authority: 'https://login.microsoftonline.com/<tenant_id>',
            logout: 'https://login.microsoftonline.com/<tenant_id>/oauth2/logout',
            loginRedirect: 'http://localhost:3000',
            logoutRedirect: 'http://localhost:3000/login'
        };
        return new Promise((resolve) => setTimeout(() => resolve({data: securityConfig}), EXPLAIN_DELAY));
    }
}
