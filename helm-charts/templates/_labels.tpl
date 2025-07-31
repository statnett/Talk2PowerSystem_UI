{{/*
Expand the name of the chart.
*/}}
{{- define "t2ps-chatbot-ui.name" -}}
  {{- default .Chart.Name .Values.nameOverride | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Create a default fully qualified app name.
We truncate at 63 chars because some Kubernetes name fields are limited to this (by the DNS naming spec).
If release name contains chart name it will be used as a full name.
*/}}
{{- define "t2ps-chatbot-ui.fullname" -}}
  {{- if .Values.fullnameOverride }}
    {{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" }}
  {{- else }}
    {{- $name := default .Chart.Name .Values.nameOverride }}
    {{- if contains $name .Release.Name }}
      {{- .Release.Name | trunc 63 | trimSuffix "-" }}
    {{- else }}
      {{- printf "%s-%s" .Release.Name $name | trunc 63 | trimSuffix "-" }}
    {{- end }}
  {{- end }}
{{- end }}

{{/*
Create chart name and version as used by the chart label.
*/}}
{{- define "t2ps-chatbot-ui.chart" -}}
  {{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" }}
{{- end }}

{{/*
Common labels
*/}}
{{- define "t2ps-chatbot-ui.labels" -}}
helm.sh/chart: {{ include "t2ps-chatbot-ui.chart" . }}
{{ include "t2ps-chatbot-ui.selectorLabels" . }}
app.kubernetes.io/version: {{ coalesce .Values.image.tag .Chart.AppVersion | quote }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
app.kubernetes.io/component: chatbot-ui
app.kubernetes.io/part-of: talk-to-the-power-system
{{- if .Values.labels }}
{{ tpl (toYaml .Values.labels) . }}
{{- end }}
{{- end }}

{{/*
Selector labels
*/}}
{{- define "t2ps-chatbot-ui.selectorLabels" -}}
app.kubernetes.io/name: {{ include "t2ps-chatbot-ui.name" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end }}

{{/*
Create the name of the service account to use
*/}}
{{- define "t2ps-chatbot-ui.serviceAccountName" -}}
  {{- if .Values.serviceAccount.create }}
    {{- default (include "t2ps-chatbot-ui.fullname" .) .Values.serviceAccount.name }}
  {{- else }}
    {{- default "default" .Values.serviceAccount.name }}
  {{- end }}
{{- end }}

{{/*
Returns the namespace of the release.
*/}}
{{- define "t2ps-chatbot-ui.namespace" -}}
  {{- .Values.namespaceOverride | default .Release.Namespace | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{/*
Returns the name of the ConfigMap resource used to provide the nginx configuration for the backend service.
*/}}
{{- define "t2ps-chatbot.service.proxy.configuration" -}}
  {{- printf "t2ps-chatbot-service-proxy-configuration" -}}
{{- end -}}