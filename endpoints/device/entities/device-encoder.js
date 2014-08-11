module.exports = DeviceEncoder;

function DeviceEncoder(data) {
    if (!(this instanceof DeviceEncoder)) {
        return new DeviceEncoder(data);
    }

    /*jshint camelcase: false*/

    data = data || {};
    this.id = typeof data.id === 'number' ?
        data.id : null;
    this.device_token = typeof data.deviceToken === 'string' ?
        data.deviceToken : '';
    this.user_id = typeof data.userId === 'number' ?
        data.userId : null;
    this.type = typeof data.type === 'string' ?
        data.type : '';
    this.name = typeof data.name === 'string' ?
        data.name : '';
}
