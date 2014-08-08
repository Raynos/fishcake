var mountEndpoint = require('./lib/mount-endpoint');

var specs = {
    queries: {},
    commands: {
        'index': {
            handler: require('./auth.js'),
            schema: {
                '1.0.0': require('./specs/auth-v1.0.0.json')
            }
        }
    }
};

module.exports = mountEndpoint(__dirname, specs);
