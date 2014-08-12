module.exports = DeviceDecoder;

function DeviceDecoder(data) {
    if (!(this instanceof DeviceDecoder)) {
        return new DeviceDecoder(data);
    }

    /*jshint camelcase: false*/

    data = data || {};
    this.id = typeof data.id === 'number' ?
        data.id : -1;
    this.deviceToken = typeof data.device_token === 'string' ?
        data.device_token : '';
    this.userId = typeof data.user_id === 'number' ?
        data.user_id : -1;
    this.type = typeof data.type === 'string' ?
        data.type : '';
    this.name = typeof data.name === 'string' ?
        data.name : '';
}
