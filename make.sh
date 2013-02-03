#!/opt/bin/bash

node node_modules/requirejs/bin/r.js -o app/build.js
mv app/build/main.js app/main-built.js
rm -rf app/build