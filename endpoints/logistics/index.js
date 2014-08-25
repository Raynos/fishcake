var path = require('path');
var mountEndpoint = require('sirvice/endpoint');

module.exports = mountEndpoint({
    endpointDir: path.join(__dirname, '..'),
    spec: require('./specs/spec.json'),
    handlers: {
        postSupply: require('./post-supply.js')
    }
});
