var fetchConfig = require('zero-config');
var path = require('path');

var SpecManager = require('sirvice/swagger/spec-loader.js');

var config = fetchConfig(path.join(__dirname, '..'), {
    dc: process.env.NODE_ENV === 'production' ?
        '/etc/uber/datacenter' : null
});

var specManager = new SpecManager({
    settings: config.get('spec'),
    serverDir: path.join(__dirname, '..'),
    endpointRootDir: path.join(__dirname, '..', '..', 'endpoints')
});
var specMap = specManager.loadSpecs();

console.log('specMap', specMap);

specManager.saveVersionMap();
