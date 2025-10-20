# Variables in global scope
ARG APP_CONTEXT_PATH=${APP_CONTEXT_PATH:-"/chat/"}

# Intermediate stage used for application building
FROM node:24-alpine AS build-stage

WORKDIR /t2ps-chatbot-ui/

COPY . .

# Consume into local stage scope
ARG APP_CONTEXT_PATH

# Updates dependencies and builds the app
RUN npm clean-install && \
    npm run generate-project-info && \
    npm run build --env baseHref=${APP_CONTEXT_PATH}


# Bundle up
FROM nginx:stable-alpine-slim

# Consume into local stage scope
ARG APP_CONTEXT_PATH

# Copy proxy config template
COPY nginx/ /etc/nginx/

# Apply context path to the proxy config
RUN sed -i "s|{%APP_CTX_PATH%}|$APP_CONTEXT_PATH|g" /etc/nginx/conf.d/default.conf

COPY --from=build-stage /t2ps-chatbot-ui/dist/ /usr/share/nginx/html${APP_CONTEXT_PATH}
