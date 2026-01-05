# Intermediate stage used for application building
FROM node:22-alpine AS build-stage

WORKDIR /t2ps-chatbot-ui/

COPY . .

# Updates dependencies and builds the app
RUN npm clean-install && \
    npm run generate-project-info && \
    npm run build --env baseHref=/chat/


# Bundle up
FROM nginx:stable-alpine-slim

# Setting default CONTEXT_PATH
ENV CONTEXT_PATH=/chat/ \
    PROXY_CONNECT_TIMEOUT=60s \
    PROXY_READ_TIMEOUT=180s \
    PROXY_SEND_TIMEOUT=180s

# Copy proxy config templates
COPY nginx/ /etc/nginx/

# Copy initialization scripts that will be executed during container startup
COPY docker/scripts/ /docker-entrypoint.d/
RUN chmod +x /docker-entrypoint.d/context-path-adapter.sh

COPY --from=build-stage /t2ps-chatbot-ui/dist/ /usr/share/nginx/html/
