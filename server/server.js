#!/usr/bin/env node
var hostname = require('os').hostname;
var process = require('process');
var http = require('http');

var createRouter = require('./http-router.js');

function main() {
    var service = {};

    var router = createRouter();
    service.router = router;
    service.server = http.createServer(router);

    // log all access
    service.server.on('request', function onRequest(req) {
        console.log('serving request', req.url);
    });
    service.server.on('listening', function onListen() {
        var addr = service.server.address();

        console.log('listening on', addr.port);
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
    service.server.listen(3000);
}
