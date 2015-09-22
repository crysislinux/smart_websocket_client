#!/bin/sh

if [ ! -z "$PRODUCTION" ] && [ $PRODUCTION -eq 1 ]
then
  ./node_modules/.bin/webpack --progress --profile --colors --config webpack.config.production.js
else
  ./node_modules/.bin/webpack --progress --profile --colors
fi
