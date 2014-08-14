var createLogger = require('playdoh-clients/logger.js');
var createStatsd = require('playdoh-clients/statsd.js');
var createUncaught = require('playdoh-clients/uncaught.js');
var createONClient = require('./on-client.js');
// var createApi = require('./api-client.js');
var createLevel = require('./level.js');

module.exports = createClients;

function createClients(config) {
    var clients = {};

    clients.statsd = createStatsd(config, clients);
    clients.logger = createLogger(config, clients);
    clients.onError = createUncaught(config, clients);
    clients.onClient = createONClient(config, clients);
    // clients.api = createApi(config, clients);
    clients.level = createLevel(config, clients);

    clients.destroy = destroy;

    return clients;

    function destroy() {
        // destroy other stateful clients here.
        clients.level.close();
    }
}
