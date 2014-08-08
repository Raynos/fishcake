var createLogger = require('../lib/playdoh-clients/logger.js');
var createStatsd = require('../lib/playdoh-clients/statsd.js');
var createUncaught = require('../lib/playdoh-clients/uncaught.js');
// var createApi = require('./api-client.js');

module.exports = createClients;

function createClients(config) {
    var clients = {};

    clients.statsd = createStatsd(config, clients);
    clients.logger = createLogger(config, clients);
    console.log('logger', clients.logger);
    clients.onError = createUncaught(config, clients);
    // clients.api = createApi(config.get('api'), clients);

    return clients;
}
