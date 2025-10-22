export class ComponentsRestFakeBackend {

  getComponentInfo() {
    return new Promise((resolve) => resolve({data: componentsInfo}));
  }
}

const componentsInfo = {
  "ontologies": [
    {
      "name": "Assessed Element Vocabulary",
      "uri": "https://ap-voc.cim4.eu/AssessedElement#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Asset Vocabulary",
      "uri": "http://iec.ch/TC57/ns/CIM/Assets#Ontology",
      "version": "2.0.0",
      "date": "2025-08-14"
    },
    {
      "name": "AssetCatalogue Vocabulary",
      "uri": "http://iec.ch/TC57/ns/CIM/AssetCatalogue#Ontology",
      "version": "2.0.0",
      "date": "2025-08-14"
    },
    {
      "name": "Availability schedule vocabulary",
      "uri": "https://ap-voc.cim4.eu/AvailabilitySchedule#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Contingency Vocabulary",
      "uri": "https://ap-voc.cim4.eu/Contingency#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Core Equipment Vocabulary",
      "uri": "http://iec.ch/TC57/ns/CIM/CoreEquipment-EU#Ontology",
      "version": "3.0.0",
      "date": "2020-10-12"
    },
    {
      "name": "Dataset metadata vocabulary",
      "uri": "https://ap-voc.cim4.eu/DatasetMetadata#Ontology",
      "version": "2.4.0",
      "date": "2024-09-07"
    },
    {
      "name": "Diagram Layout Vocabulary",
      "uri": "http://iec.ch/TC57/ns/CIM/DiagramLayout-EU#Ontology",
      "version": "3.0.0",
      "date": "2020-10-12"
    },
    {
      "name": "Document header vocabulary",
      "uri": "https://ap-voc.cim4.eu/DocumentHeader#Ontology",
      "version": "2.3.4",
      "date": "2024-09-07"
    },
    {
      "name": "Dynamics Vocabulary",
      "uri": "http://iec.ch/TC57/ns/CIM/Dynamics-EU#Ontology",
      "version": "1.0.0",
      "date": "2020-10-12"
    },
    {
      "name": "Equipment Boundary Vocabulary",
      "uri": "http://iec.ch/TC57/ns/CIM/EquipmentBoundary-EU#Ontology",
      "version": "3.0.0",
      "date": "2020-10-12"
    },
    {
      "name": "Equipment Reliability Vocabulary",
      "uri": "https://ap-voc.cim4.eu/EquipmentReliability#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Geographical Location Vocabulary",
      "uri": "http://iec.ch/TC57/ns/CIM/GeographicalLocation-EU#Ontology",
      "version": "3.0.0",
      "date": "2020-10-12"
    },
    {
      "name": "Grid Disturbance vocabulary",
      "uri": "https://ap-voc.cim4.eu/GridDisturbance#Ontology",
      "version": "1.1.1",
      "date": "2024-09-07"
    },
    {
      "name": "Impact Assessment Matrix Vocabulary",
      "uri": "https://ap-voc.cim4.eu/ImpactAssessmentMatrix#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Monitoring area Vocabulary",
      "uri": "https://ap-voc.cim4.eu/MonitoringArea#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Object Registry vocabulary",
      "uri": "https://ap-voc.cim4.eu/ObjectRegistry#Ontology",
      "version": "2.2.3",
      "date": "2024-09-07"
    },
    {
      "name": "Operation Vocabulary",
      "uri": "http://iec.ch/TC57/ns/CIM/Operation-EU#Ontology",
      "version": "3.0.0",
      "date": "2020-10-12"
    },
    {
      "name": "Power System Project Vocabulary",
      "uri": "https://ap-voc.cim4.eu/PowerSystemProject#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Power schedule vocabulary",
      "uri": "https://ap-voc.cim4.eu/PowerSchedule#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Remedial Action Schedule Vocabulary",
      "uri": "https://ap-voc.cim4.eu/RemedialActionSchedule#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Remedial action Vocabulary",
      "uri": "https://ap-voc.cim4.eu/RemedialAction#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Security Analysis Result Vocabulary",
      "uri": "https://ap-voc.cim4.eu/SecurityAnalysisResult#Ontology",
      "version": "2.4",
      "date": "2024-09-07"
    },
    {
      "name": "Sensitivity Matrix Vocabulary",
      "uri": "https://ap-voc.cim4.eu/SensitivityMatrix#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Short Circuit Vocabulary",
      "uri": "http://iec.ch/TC57/ns/CIM/ShortCircuit-EU#Ontology",
      "version": "3.0.0",
      "date": "2020-10-12"
    },
    {
      "name": "State Variables Vocabulary",
      "uri": "http://iec.ch/TC57/ns/CIM/StateVariables-EU#Ontology",
      "version": "3.0.0",
      "date": "2020-10-12"
    },
    {
      "name": "State instruction schedule vocabulary",
      "uri": "https://ap-voc.cim4.eu/StateInstructionSchedule#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Steady State Hypothesis Schedule Vocabulary",
      "uri": "https://ap-voc.cim4.eu/SteadyStateHypothesisSchedule#Ontology",
      "version": "1.0.1",
      "date": "2024-09-07"
    },
    {
      "name": "Steady State Hypothesis Vocabulary",
      "uri": "http://iec.ch/TC57/ns/CIM/SteadyStateHypothesis-EU#Ontology",
      "version": "3.0.0",
      "date": "2020-10-12"
    },
    {
      "name": "Steady state instruction Vocabulary",
      "uri": "https://ap-voc.cim4.eu/SteadyStateInstruction#Ontology",
      "version": "2.3.1",
      "date": "2024-09-07"
    },
    {
      "name": "Topology Vocabulary",
      "uri": "http://iec.ch/TC57/ns/CIM/Topology-EU#Ontology",
      "version": "3.0.0",
      "date": "2020-10-12"
    },
    {
      "name": "CIM Inferred Extension Ontology",
      "uri": "https://cim.ucaiug.io/rules#",
      "version": "1.1",
      "date": "2025-08-13"
    }
  ],
  "datasets": [
    {
      "name": "20160101_N44-ENT-Schneider_AC_v3-0-0-beta-1",
      "uri": "urn:uuid:ade44b65-0bfa-41e0-95c5-2ccb345a6fed",
      "date": "2025-02-14"
    },
    {
      "name": "20160101_N44-ENT-Siemens_AC_v3-0-0-beta-1",
      "uri": "urn:uuid:75f351c7-75a6-4c25-8f1c-985aa59e90ad",
      "date": "2025-02-14"
    },
    {
      "name": "20160101_N44-ENT-Statnett_AS_v3-0-0-beta-1",
      "uri": "urn:uuid:eb4d92e6-d4da-11e7-9296-cec278b6b50a",
      "date": "2025-02-14"
    },
    {
      "name": "20160101_N44-NC-HV_CD_v3-0-0-beta-1",
      "uri": "urn:uuid:d9a01a85-0ad8-4958-be03-d89ad78ca497",
      "date": "2025-02-14"
    },
    {
      "name": "20160101_N44-NC-HV_CO_v3-0-0-beta-1",
      "uri": "urn:uuid:84552e03-0040-43d5-aff2-0f77f01668cb",
      "date": "2025-02-14"
    },
    {
      "name": "20160101_N44-NC-HV_ER_v3-0-0-beta-1",
      "uri": "urn:uuid:ebef4527-f0bc-4c59-8870-950af8ed9041",
      "date": "2025-02-14"
    },
    {
      "name": "20160101_N44-NC-HV_RAS_v3-0-0-beta-1",
      "uri": "urn:uuid:3f3f00a8-b86a-4a3e-ab86-2cd3140fa187",
      "date": "2025-02-14"
    },
    {
      "name": "20160101_N44-NC-HV_RA_v3-0-0-beta-1",
      "uri": "urn:uuid:9e3521e2-9504-4122-8c1e-a4c4411ffd7a",
      "date": "2025-02-14"
    },
    {
      "name": "20160101_N44-NC-HV_SSI_v3-0-0-beta-1",
      "uri": "urn:uuid:ebe06a74-e44c-491f-bbfe-1cabb232828e",
      "date": "2025-02-14"
    },
    {
      "name": "DIGIN10-30-BaseVoltage_RD",
      "uri": "urn:uuid:f4c70c71-77e2-410e-9903-cbd85305cdc4",
      "date": "2022-04-06"
    },
    {
      "name": "DIGIN10-30-GeographicalRegion_RD",
      "uri": "urn:uuid:5ad50f29-f3e5-4cf9-8519-cef17d71f8de",
      "date": "2022-04-01"
    },
    {
      "name": "DIGIN10-30-HV1-MV1_BM",
      "uri": "urn:uuid:b39e7379-a9ae-4262-98dc-9ade1200adb0",
      "date": "2022-04-06"
    },
    {
      "name": "DIGIN10-30-LV1_AS",
      "uri": "urn:uuid:14a0302f-aaae-4abd-862f-7b0c86b4dca2",
      "date": "2022-10-28"
    },
    {
      "name": "DIGIN10-30-LV1_CU",
      "uri": "urn:uuid:596d41fa-11d3-41da-b231-e05724325e9b",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-LV1_DL",
      "uri": "urn:uuid:02c12c37-ced0-4cbd-8fc2-4b51b0c532a6",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-LV1_EQ",
      "uri": "urn:uuid:c47d4310-b8ee-480d-9cf3-e53a81630981",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-LV1_GL",
      "uri": "urn:uuid:9552dc72-0525-4a84-8532-81f160b8fb74",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-LV1_OP",
      "uri": "urn:uuid:c47d4310-b8ee-480d-9cf3-e53a81630981",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-LV1_OR",
      "uri": "urn:uuid:2e4ac4ff-692d-48e5-9837-cc0db61ee3dd",
      "date": "2022-04-11"
    },
    {
      "name": "DIGIN10-30-LV1_SC",
      "uri": "urn:uuid:50ae854b-afb8-4d42-bd4b-e97f1ee1ca6f",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-LV1_SSH",
      "uri": "urn:uuid:a529556e-aa95-4b28-b729-e9114f90880a",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-M1_AC",
      "uri": "urn:uuid:309fe4e7-d477-44e1-a495-de43562b3504",
      "date": "2022-10-28"
    },
    {
      "name": "DIGIN10-30-MV1-LV1_BM",
      "uri": "urn:uuid:f4c70c71-77e2-410e-9903-cbd85305cdc4",
      "date": "2022-04-06"
    },
    {
      "name": "DIGIN10-30-MV1-LV1_SV",
      "uri": "urn:uuid:00db75c5-d443-42e5-927b-ca9a2e14fd48",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-MV1-LV1_TP",
      "uri": "urn:uuid:ef750ad6-a00c-4db3-b5c3-f849c096c2a5",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-MV1_AS",
      "uri": "urn:uuid:7c2e25c9-331f-46f2-a4d4-d33c2e25d342",
      "date": "2022-10-28"
    },
    {
      "name": "DIGIN10-30-MV1_CU",
      "uri": "urn:uuid:5f21a6a1-1d98-45f0-89f1-e4d7aa34691a",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-MV1_DL",
      "uri": "urn:uuid:1399ce7d-e052-4714-954a-a17c7d6b4073",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-MV1_EQ",
      "uri": "urn:uuid:d12e4546-e6a5-4211-a4c8-877ac1e24d16",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-MV1_GL",
      "uri": "urn:uuid:99790ba1-4bb2-4960-ade7-34d245740654",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-MV1_OP",
      "uri": "urn:uuid:31b9fe89-c729-4bb3-9f6c-22f885607731",
      "date": "2022-10-28"
    },
    {
      "name": "DIGIN10-30-MV1_SC",
      "uri": "urn:uuid:9f36f713-b4d4-40a6-809f-9c342c3110ce",
      "date": "2022-03-30"
    },
    {
      "name": "DIGIN10-30-MV1_SSH",
      "uri": "urn:uuid:f19668c6-e0a1-4db7-bfee-7645392d0021",
      "date": "2021-04-28"
    },
    {
      "name": "DIGIN10-30-MeasurementValueSource_RD",
      "uri": "urn:uuid:aca7b76a-77d9-42ce-bd34-67f4b12800f9",
      "date": "2022-10-24"
    },
    {
      "name": "DIGIN10-30-WattApp-GL",
      "uri": "urn:uuid:971c4254-5365-4aaf-8fa6-02658b3f8e05",
      "date": "2023-02-21"
    },
    {
      "name": "Diagram Layout (DL) part of the Nordic 44-bus synthetic test model developed by Statnett SF of the Nordic region.",
      "uri": "urn:uuid:2e11908e-5e1f-8542-854c-54da76d379d1",
      "date": "2025-02-14"
    },
    {
      "name": "Equipment (EQ) part of the Nordic 44-bus synthetic test model developed by Statnett SF of the Nordic region.",
      "uri": "urn:uuid:e710212f-f6b2-8d4c-9dc0-365398d8b59c",
      "date": "2025-02-14"
    },
    {
      "name": "Equipment Operation (OP) part of the Nordic 44-bus synthetic test model developed by Statnett SF of the Nordic region.",
      "uri": "urn:uuid:67e97bb0-ec38-481d-9e56-3e9d45e95a33",
      "date": "2025-02-14"
    },
    {
      "name": "Geographical Location (GL) part of the Nordic 44-bus synthetic test model developed by Statnett SF of the Nordic region.",
      "uri": "urn:uuid:167b4832-27c5-ff4f-bd26-6ce3bff1bdb7",
      "date": "2025-02-14"
    },
    {
      "name": "State Variable (SV) part of the Nordic 44-bus synthetic test model developed by Statnett SF of the Nordic region.",
      "uri": "urn:uuid:5b6a8b13-4c20-4147-8ed6-7249e303e647",
      "date": "2025-02-14"
    },
    {
      "name": "Steady-State Hypothesis (SSH) part of the Nordic 44-bus synthetic test model developed by Statnett SF of the Nordic region.",
      "uri": "urn:uuid:1d08772d-c1d0-4c47-810d-b14908cd94f5",
      "date": "2025-02-14"
    },
    {
      "name": "Telemark-120_AO",
      "uri": "urn:uuid:f1d9a88d-0ff5-4e4b-9d6a-c353fe8232c3",
      "date": "2024-02-06"
    },
    {
      "name": "Topological (TP) part of the Nordic 44-bus synthetic test model developed by Statnett SF of the Nordic region.",
      "uri": "urn:uuid:7b3f94c0-bd9b-e74e-866b-f473153c3e70",
      "date": "2025-02-14"
    }
  ],
  "graphdb": {
    "baseUrl": "https://cim.ontotext.com/graphdb",
    "repository": "cim",
    "version": "11.1.1+sha.82602bfa",
    "numberOfExplicitTriples": 122948,
    "numberOfTriples": 323308,
    "autocompleteIndexStatus": "CANCELED",
    "rdfRankStatus": "COMPUTED"
  },
  "agent": {
    "assistantInstructions": "Role & Objective:\n  You are a natural language querying assistant. Your goal is to answer users' questions related to electricity data, including:\n    - A power grid model\n    - Time-series data for power generation and consumption, and electricity prices. The timestamps for the time series data are in UTC time zone, while the user may be in a different time zone, so always assume the time periods are relative to the user's time.\n\nGeneral Reasoning Flow:\n  1. Check Relevance:\n    - Determine if the question is within the scope of the dataset.\n    - If it is out of scope, clearly inform the user (e.g., “That type of data is not available in the current dataset.”).\n  2. Entity Recognition and Resolution:\n    - Determine if the question refers to one or more named entities from the dataset.\n    - If it does, use the `autocomplete_search_tool` to retrieve their IRIs. Always use their IRIs in SPARQL queries; never refer to named entities by name in the SPARQL queries.\n    - Exception - do not use the `autocomplete_search_tool`, when an entity is referred by identifier. Valid identifiers are:\n      - EIC (Energy Identification Code)- always 16 characters, can include uppercase letters, numbers and hyphens, examples: \"10YNO-1--------2\", \"\"50Y73EMZ34CQL9AJ\"; use the predicate: `eu:IdentifiedObject.energyIdentCodeEic` to find the IRI and the class of the entity.\n      - full mRID - always 36 hexadecimal characters, 5 blocks of hexadecimal digits separated by hyphens, example: `f1769d10-9aeb-11e5-91da-b8763fd99c5f`; use the predicate: `cim:IdentifiedObject.mRID` to find the IRI and the class of the entity.\n      - significant part of the mRID - 8 hexadecimal characters, example: `f1769d10`; use the predicate: `cimr:mridSignificantPart` to find the IRI and the class of the entity.\n    In order to validate whether or not a sequence is a valid identifier, you must always use the `sparql_query` to find the entity and the entity class.\n    If the query returns no results, this means that this is a number sequence, and not a valid entity identifier.\n    This means you are mistaken, and should proceed with the next steps.\n\nSPARQL queries guidance:\n  - Use only the classes and properties provided in the schema and don't invent or guess any.\n  - Literal datatypes are significant. In SPARQL, when you compare a literal value (like a number or a date), its datatype is extremely important.\n  If the datatype is not specified or is incorrect, the query will likely fail to return results.\n  The ontology schema given below explicitly defines the expected datatype for properties using `rdfs:range`. \n  You must always consult the `rdfs:range` of the predicate involved in a literal comparison and ensure the literal in your SPARQL query uses the matching `xsd:dataType`.\n  Rule for Literals:\n    * Strings: Use double quotes, optionally with a language tag (e.g., \"hello\"@en). If no language tag, it's typically treated as `xsd:string`.\n    * Numbers, Booleans, Dates, etc.: These must be wrapped in double quotes and explicitly typed using ^^xsd:dataType.\n  Common xsd:dataType examples:\n    * `xsd:integer` (e.g., \"123\"^^xsd:integer)\n    * `xsd:float` (e.g., \"123.0\"^^xsd:float, \"123\"^^xsd:float)\n    * `xsd:double` (e.g., \"1.23\"^^xsd:double)\n    * `xsd:decimal` (e.g., \"1.23\"^^xsd:decimal)\n    * `xsd:boolean` (e.g., \"true\"^^xsd:boolean, \"false\"^^xsd:boolean)\n    * `xsd:dateTime` (e.g., \"2025-06-18T10:00:00Z\"^^xsd:dateTime)\n    * `xsd:date` (e.g., \"2025-06-18\"^^xsd:date)\n  Literal term equality: Two literals are term-equal (the same RDF literal) if and only if the two lexical forms, the two datatype IRIs, and the two language tags (if any) compare equal, character by character. \n  Thus, two literals can have the same value without being the same RDF term. For example:\n    \"1\"^^xs:integer\n    \"01\"^^xs:integer\n  denote the same value, but are not the same literal RDF terms and are not term-equal because their lexical form differs.\n  Hence, you must always use this pattern, when comparing literals \n    ``\n      ?subject ?predicate ?object.\n      FILTER (?object = <value-with-xsd-datatype>)\n    ``\n\nThe ontology schema to use in SPARQL queries is:\n\n```turtle\n{ontology_schema}\n```\n\nPay special attention to ``cims:pragmatics`` from the ontology schema. You can find practical information for the classes and properties.\nAlso, for some predicates you can find the unique object values for this predicate (``skos:example`` also gives all possible values).\n",
    "llm": {
      "type": "azure_openai",
      "model": "gpt-4.1",
      "temperature": 0,
      "seed": 1
    },
    "tools": {
      "sparql_query": {
        "enabled": true
      },
      "autocomplete_search": {
        "enabled": true,
        "property_path": "<https://cim.ucaiug.io/ns#IdentifiedObject.name> | <https://cim.ucaiug.io/ns#IdentifiedObject.aliasName> | <https://cim.ucaiug.io/ns#CoordinateSystem.crsUrn>",
        "sparql_query_template": "PREFIX sesame: <http://www.openrdf.org/schema/sesame#>\nPREFIX rank: <http://www.ontotext.com/owlim/RDFRank#>\nPREFIX auto: <http://www.ontotext.com/plugins/autocomplete#>\nSELECT ?iri ?name ?class ?rank {{\n    ?iri auto:query \"{query}\" ;\n        {property_path} ?name ;\n        {filter_clause}\n        sesame:directType ?class;\n        rank:hasRDFRank5 ?rank.\n}}\nORDER BY DESC(?rank)\nLIMIT {limit}\n"
      },
      "sample_sparql_queries": {
        "enabled": true,
        "sparql_query_template": "PREFIX retr: <http://www.ontotext.com/connectors/retrieval#>\nPREFIX retr-index: <http://www.ontotext.com/connectors/retrieval/instance#>\nPREFIX qa: <https://www.statnett.no/Talk2PowerSystem/qa#>\nSELECT ?question ?query {{\n    [] a retr-index:{connector_name} ;\n      retr:query \"{query}\" ;\n      retr:limit {limit} ;\n      retr:entities ?entity .\n    ?entity retr:score ?score;\n      qa:question ?question;\n      qa:sparql_query ?query.\n    FILTER (?score > {score})\n}}\nORDER BY DESC(?score)\n",
        "connector_name": "qa_dataset"
      },
      "retrieve_data_points": {
        "enabled": true,
        "base_url": "https://statnett.cognitedata.com",
        "project": "prod",
        "client_name": "talk2powersystem"
      },
      "retrieve_time_series": {
        "enabled": true,
        "base_url": "https://statnett.cognitedata.com",
        "project": "prod",
        "client_name": "talk2powersystem"
      },
      "now": {
        "enabled": true
      }
    }
  },
  "backend": {
    "description": "Talk2PowerSystem Chat Bot Application provides functionality for chatting with the Talk2PowerSystem Chat bot",
    "version": "1.1.0a0",
    "buildDate": "2024-01-09T13:31:49Z",
    "buildBranch": "COOL-BRANCH-NAME",
    "gitSHA": "a730751ac055a4f2dad3dc3e5658bb1bf30ff412",
    "pythonVersion": "3.12.11 | packaged by conda-forge | (main, Jun  4 2025, 14:45:31) [GCC 13.3.0]",
    "dependencies": {
      "ttyg": "1.9.0",
      "graphrag-eval": "5.1.2",
      "jupyter": "1.1.1",
      "langchain-openai": "0.3.32",
      "langgraph-checkpoint-redis": "0.1.1",
      "jsonlines": "4.0.0",
      "cognite-sdk": "7.86.0",
      "pydantic-settings": "2.10.1",
      "PyYAML": "6.0.2",
      "uvicorn[standard]": "0.35.0",
      "fastapi": "0.116.1",
      "toml": "0.10.2",
      "markdown": "3.8.2",
      "python-jose[cryptography]": "3.5.0",
      "cachetools": "6.2.0",
      "importlib_resources": "6.5.2"
    }
  }
}
