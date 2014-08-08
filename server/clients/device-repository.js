var Repository = require('evented-repository/level');

module.exports = createDeviceRepository;

function createDeviceRepository(clients) {
    var repo = Repository(clients.level, {
        namespace: 'devices',
        encoder: DeviceEncoder,
        decoder: DeviceDecoder
    });

    return repo;
}

function DeviceEncoder(data) {
    if (!(this instanceof DeviceEncoder)) {
        return new DeviceEncoder(data);
    }

    /*jshint camelcase: false*/

    data = data || {};
    this.device_token = typeof data.deviceToken === 'string' ?
        data.deviceToken : '';
    this.user_id = typeof data.userId === 'number' ?
        data.userId : null;
    this.type = typeof data.type === 'string' ?
        data.type : '';
    this.name = typeof data.name === 'string' ?
        data.name : '';
}

function DeviceDecoder(data) {
    if (!(this instanceof DeviceDecoder)) {
        return new DeviceDecoder(data);
    }

    /*jshint camelcase: false*/

    data = data || {};
    this.deviceToken = typeof data.device_token === 'string' ?
        data.deviceToken : '';
    this.userId = typeof data.user_id === 'number' ?
        data.userId : null;
    this.type = typeof data.type === 'string' ?
        data.type : '';
    this.name = typeof data.name === 'string' ?
        data.name : '';
}
