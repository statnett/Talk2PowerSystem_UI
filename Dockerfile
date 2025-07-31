# Intermediate stage used for application building
FROM node:24-alpine AS build-stage

WORKDIR /t2ps-chatbot-ui/

COPY . .

# Updates dependencies and builds the app
RUN npm clean-install && npm run build


# Bundle up
FROM nginx:stable-alpine-slim

COPY nginx/ /etc/nginx/

COPY --from=build-stage /t2ps-chatbot-ui/dist/ /usr/share/nginx/html/
