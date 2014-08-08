#!/usr/bin/env node
var hostname = require('os').hostname;
var fetchConfig = require('playdoh-server/config');
var process = require('process');

var createServer = require('./lib/create-server.js');
var createRouter = require('./router.js');
var createClients = require('./clients/');

function main() {
    var service = {};
    var config = service.config = fetchConfig(__dirname, {
        dc: process.env.NODE_ENV === 'production' ?
            '/etc/uber/datacenter' : null
    });
    var clients = service.clients = createClients(config);

    var router = createRouter(config, clients);
    service.router = router;
    service.server = createServer(router, {
        config: config,
        clients: clients
    });

    return service;
}

module.exports = main;

if (require.main === module) {
    // settings the process title allows a process monitor to
    // have a useful name for your process when monitoring it.
    process.title = 'nodejs-rt-myTest-on-' + hostname();

    var service = main();
    service.server.listen(service.config.get('port'));
    service.server.perfServer
        .listen(service.config.get('controlPort'));

    process.on('uncaughtException', service.clients.onError);
}
