#!/usr/bin/env node
var hostname = require('os').hostname;
var fetchConfig = require('zero-config');
var process = require('process');
var createServer = require('sirvice/server.js');
var perf = require('playdoh-perf');

var createRouter = require('./http-router.js');
var createClients = require('./clients/');
var createServices = require('../business/');

function main(seedConfig) {
    var service = {};
    var config = service.config = fetchConfig(__dirname, {
        dc: process.env.NODE_ENV === 'production' ?
            /* istanbul ignore next */ '/etc/uber/datacenter' : null
    });

    // seedConfig is test only stuff.
    if (seedConfig) {
        Object.keys(seedConfig).forEach(function setConfig(k) {
            config.set(k, seedConfig[k]);
        });
    }

    var clients = service.clients = createClients(config);
    var services = service.services = createServices(clients);

    var router = createRouter(config, clients);
    service.controlPort = perf(config.get('perfSettings'));
    service.router = router;
    service.server = createServer(router, {
        config: config,
        clients: clients,
        services: services
    });

    return service;
}

module.exports = main;

/* istanbul ignore if  */
if (require.main === module) {
    // settings the process title allows a process monitor to
    // have a useful name for your process when monitoring it.
    process.title = 'nodejs-rt-myTest-on-' + hostname();

    var service = main();
    service.server.listen(service.config.get('port'));
    service.controlPort
        .listen(service.config.get('controlPort'));

    process.on('uncaughtException', service.clients.onError);
}
