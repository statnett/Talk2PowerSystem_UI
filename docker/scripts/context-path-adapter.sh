#!/bin/sh

set -eu

log() {
  echo "$(basename $0): $1"
}

if [ "/chat/" == "$CONTEXT_PATH" ]; then
  log "There are no changes in the context path. Skipping further processing."
  exit 0
fi

if [ $(echo -n $CONTEXT_PATH | tail -c 1) != "/" ]; then
  log "The value of CONTEXT_PATH variable should end with (/) slash! The current value is: $CONTEXT_PATH"
  exit 1
fi

INDEX_FILE=/usr/share/nginx/html/index.html
CSS_BUNDLE=/usr/share/nginx/html/main.*.css

if [ ! -e $INDEX_FILE ]; then
  log "$INDEX_FILE was not found!"
  exit 1
fi

if [ ! -e $CSS_BUNDLE ]; then
  log "$CSS_BUNDLE was not found!"
  exit 1
fi

sed -i "s|href=\"/chat/|href=\"$CONTEXT_PATH|g" $INDEX_FILE
sed -i "s|src=\"/chat/|src=\"$CONTEXT_PATH|g" $INDEX_FILE
sed -i "s|url(/chat/|url($CONTEXT_PATH|g" $CSS_BUNDLE

log "The context path of the application was successfully set to $CONTEXT_PATH"
