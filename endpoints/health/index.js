var path = require('path');
var mountEndpoint = require('fumes/endpoint');

var specs = {
    // queries compile to GET
    read: {
        'index': {
            handler: require('./health.js'),
            schema: {
                '1.0.0': 'http://demo.uber.com/spec/health-v1.0.0'
            }
        }
    }
};

module.exports = mountEndpoint(
    path.join(__dirname, '..', '..'), specs);
