var Api = require('api-client').Client;
var extend = require('xtend');

function createApi(config, clients) {
    config = extend(config.get('api'), {
        statsd: clients.statsd,
        logger: clients.logger
    });
    return new Api(config);
}

module.exports = createApi;
