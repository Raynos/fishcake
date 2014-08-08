var mountEndpoint = require('../../server/lib/mount-endpoint');

var specs = {
    // queries compile to GET
    queries: {
        'health': {
            handler: require('./health.js'),
            schema: {
                '1.0.0': require('./specs/health-v1.0.0.json')
            }
        }
    },
    // commands compile to POST / PUT / DELETE / PATCh
    commands: {}
};

module.exports = mountEndpoint(__dirname, specs);
