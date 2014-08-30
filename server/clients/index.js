var createLogger = require('playdoh-clients/logger.js');
var createStatsd = require('playdoh-clients/statsd.js');
var createUncaught = require('playdoh-clients/uncaught.js');

module.exports = createClients;

function createClients(config) {
    var clients = {};

    clients.statsd = createStatsd(config, clients);
    clients.logger = createLogger(config, clients);
    clients.onError = createUncaught(config, clients);

    clients.destroy = destroy;

    return clients;

    function destroy() {
        // destroy other stateful clients here.
    }
}
