# Talk to the Power System Chatbot UI

## 1.0.3

- Introduces new configurations allowing control over the proxied request timeouts for the Nginx. The configurations are
  provided as environment variables to the container.

  The timeouts for the `read` and `send` proxy requests are now increased to the `180s` from the default `60s`.

## 1.0.2

- Updates `appVersion` to `v2.0.0-rc1`.

## 1.0.1

- Fixes the `appVersion` value in the `Chart.yaml`. It should be prefixed with `v` in order to match the version tags
  of the container images. 

## 1.0.0

- Introduces the initial version of the Helm Chart for the Talk to the Power System Chatbot UI.
