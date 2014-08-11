var Repository = require('evented-repository/level');

var DeviceDecoder = require('./entities/device-decoder.js');
var DeviceEncoder = require('./entities/device-encoder.js');

var repo = Repository({
    namespace: 'devices',
    encoder: DeviceEncoder,
    decoder: DeviceDecoder
});

module.exports = repo;
