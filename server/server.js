#!/usr/bin/env node
var hostname = require('os').hostname;
var fetchConfig = require('playdoh-server/config');
var process = require('process');

var createServer = require('./lib/create-server.js');
var createRouter = require('./router.js');
var createClients = require('./clients/');

function main() {
    var config = fetchConfig(__dirname, {
        dc: process.env.NODE_ENV === 'production' ?
            '/etc/uber/datacenter' : null
    });
    var clients = createClients(config);
    process.on('uncaughtException', clients.onError);

    // write up the server with configuration settings at the
    // top level.
    var router = createRouter(config, clients);
    createServer(router, {
        config: config,
        clients: clients
    });
}

module.exports = main;

if (require.main === module) {
    // settings the process title allows a process monitor to
    // have a useful name for your process when monitoring it.
    process.title = 'nodejs-rt-myTest-on-' + hostname();

    main();
}
