cd ..
jshint --verbose --reporter jslint $(git ls-files | grep '\\.js$' | sed -e "s~^~${WORKSPACE:-.}/~") > server/jshint.xml
