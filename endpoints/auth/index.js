var path = require('path');
var mountEndpoint = require('./lib/mount-endpoint');

var specs = {
    rpc: {
        // POST /
        'index': {
            handler: require('./auth.js'),
            schema: {
                '1.0.0': 'http://demo.uber.com/spec/auth-v1.0.0'
            }
        }
    }
};

module.exports = mountEndpoint(
    path.join(__dirname, '..', '..'), specs);
