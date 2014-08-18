var fetchConfig = require('zero-config');
var path = require('path');
var SpecManager = require('sirvice/swagger/spec-loader.js');
var SwaggerSpecEmitter = require('sirvice/swagger/emitter.js');

var config = fetchConfig(path.join(__dirname, '..'), {
    dc: process.env.NODE_ENV === 'production' ?
        '/etc/uber/datacenter' : null
});

// TODO: Allow options to be passed in from command
var options = {
    outputDir: config.get('swagger').specOutputDir || 'public/specs',
    outputIndexFile: 'index.html',
    swaggerVersion: '1.2',
    basePath: 'http://localhost:14598',
    indent: 4
};

var specManager = new SpecManager({
    settings: config.get('spec'),
    serverDir: path.join(__dirname, '..'),
    endpointRootDir: path.join(__dirname, '..', '..', 'endpoints')
});

specManager.loadSpecs();
console.info(JSON.stringify(specManager.specMap, null, 4));

var emitter = new SwaggerSpecEmitter(specManager, options);
console.info('--------------- Start Emitting RTAPI ' +
    'Protocol Specs ------------------');
emitter.emitProtocol();
