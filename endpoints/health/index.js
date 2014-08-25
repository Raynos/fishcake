var path = require('path');
var mountEndpoint = require('sirvice/endpoint');

module.exports = mountEndpoint({
    endpointDir: path.join(__dirname, '..'),
    spec: require('./specs/spec.json'),
    handlers: {
        health: require('./health.js')
    }
});
