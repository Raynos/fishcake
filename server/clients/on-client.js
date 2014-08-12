var ONClient = require('rt-on-client');

module.exports = createONClient;

function createONClient(config) {
    return new ONClient(config.get('onClient'));
}
