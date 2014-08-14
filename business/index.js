var createAuth = require('./auth/');
var createDevice = require('./device/');

module.exports = createServices;

function createServices(clients) {
    return {
        auth: createAuth(clients),
        device: createDevice(clients)
    };
}
