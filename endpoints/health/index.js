var path = require('path');
var mountEndpoint = require('sirvice/endpoint');

module.exports = mountEndpoint(
    path.join(__dirname, '..'),
    require('./spec.json'),
    {
        health: require('./health.js')
    }
);
