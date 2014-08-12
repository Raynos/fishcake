var authClient = require('./auth-client.js');
var authDriver = require('./auth-driver.js');

module.exports = AuthService;

function AuthService(clients) {
    return {
        authenticateClient: authClient.bind(null, clients),
        authenticateDriver: authDriver.bind(null, clients)
    };
}
