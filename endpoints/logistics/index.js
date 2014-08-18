var path = require('path');
var mountEndpoint = require('sirvice/endpoint');

module.exports = mountEndpoint(
    path.join(__dirname, '..'),
    require('./specs/spec.json'),
    {
        postSupply: require('./post-supply.js')
    }
);
