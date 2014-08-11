var createLogger = require('../lib/playdoh-clients/logger.js');
var createStatsd = require('../lib/playdoh-clients/statsd.js');
var createUncaught = require('../lib/playdoh-clients/uncaught.js');
// var createApi = require('./api-client.js');
var createLevel = require('./level.js');

module.exports = createClients;

function createClients(config) {
    var clients = {};

    clients.statsd = createStatsd(config, clients);
    clients.logger = createLogger(config, clients);
    clients.onError = createUncaught(config, clients);
    // clients.api = createApi(config.get('api'), clients);
    clients.level = createLevel(config.get('level'), clients);

    return clients;
}
