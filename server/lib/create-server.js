var http = require('http');
var perf = require('playdoh-server/perf');

module.exports = createServer;

function createServer(handler, opts) {
    // boot your app here
    var server = http.createServer(routeHandler);
    var config = opts.config;
    var clients = opts.clients;

    //TODO replace me with decent logger
    server.on('request', function onRequest(req) {
        config.logger.info('got request', {
            uri: req.url
        });
    });

    server.perfServer = perf(config.get('perfSettings'));

    server.listen(config.get('port'));
    server.perfServer.listen(config.get('controlPort'));

    clients.logger.info('listening on port', {
        port: config.get('port')
    });

    return server;

    function routeHandler(req, res) {
        res.setHeader('X-Uber-App', config.get('project'));
        return handler(req, res, {
            config: config,
            clients: clients
        }/*, myOwnErrorHandlerCallback*/);
    }
}
