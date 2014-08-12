var Repository = require('evented-repository/level');

var DeviceDecoder = require('./entities/device-decoder.js');
var DeviceEncoder = require('./entities/device-encoder.js');

module.exports = DeviceService;

function DeviceService(clients) {
    var repo = Repository(clients.level, {
        namespace: 'devices',
        encoder: DeviceEncoder,
        decoder: DeviceDecoder
    });

    return repo;
}
