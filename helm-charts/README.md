# Talk to the Power System Chatbot UI Helm Charts

Helm chart for deploying Talk to the Power System Chatbot UI.

## Quick start

To run the chart:

```bash
helm upgrade --install --create-namespace --namespace t2ps-chatbot t2ps-chatbot-ui .
```

## Configurations

See [values.yaml](values.yaml).

## Uninstalling

```bash
helm uninstall --namespace t2ps-chatbot t2ps-chatbot-ui
```
