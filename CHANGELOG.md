v2.2.0-rc1
============

* [#363](https://github.com/statnett/Talk2PowerSystem_PM/issues/363):
  Add Cognite logo & timeseries questions

v2.1.0-rc1
============

* [#358](https://github.com/statnett/Talk2PowerSystem_PM/issues/358):
  Update the agent info in the components page:
  - seed and temperature fields are optional
  - introduce new optional fields use_responses_api and reasoning_effort

v2.0.0
============

* Official release of `v2.0.0-rc8` as `v2.0.0`

v2.0.0-rc8
============

* [#221](https://github.com/statnett/Talk2PowerSystem_PM/issues/221):
  Update the "Diagram & Model" questions.

v2.0.0-rc7
============

* ux improvments

v2.0.0-rc6
============

* fix visgraph click handlers

v2.0.0-rc5
============

* fix visgraph click handlers

v2.0.0-rc4
============

* interaction with svg

v2.0.0-rc3
============

* UI fixes on redesigned bot
* Fixes the loading of the favicons

v2.0.0-rc2
============

* Introduces new settings allowing control over proxied request timeouts

v2.0.0-rc1
============

⚠ BREAKING CHANGES

* The Authorization header now sends the accessToken instead of the idToken. Backend integrations relying on the previous token type must ensure compatibility with access tokens.

Features

* Implemented a right-side panel for displaying diagrams and external resources (SVG, image, iframe).
* Added interactive SVG support for PowSyBl and VizGraph diagrams.
* Added a Questions List component in the left sidebar with predefined grouped questions.
* Full chatbot rebranding by updating typography to Inter, replacing FontAwesome with Remix Icons, swapping logos with official branding assets and refining the layout and sidebar behavior for improved visual consistency.

v1.0.0
============

Features

* [#135](https://github.com/statnett/Talk2PowerSystem_PM/issues/135):
  Introduces the initial version of the Chatbot web application.
  The application is a prototype, allowing the users to have a conversation with the chat service
  developed for the Talk2PowerSystem project.
* [#130](https://github.com/statnett/Talk2PowerSystem_PM/issues/130):
  Introduces Dockerfile and Helm Chart for the Chatbot web application.
  The resources will help for easier deployment on Kubernetes environment(s).
