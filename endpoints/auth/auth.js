var authenticateClient = require('./domain/auth-client.js');
var authenticateDriver = require('./domain/auth-driver.js');

module.exports = authHandler;

function authHandler(incoming, opts, cb) {
    var credentials = {
        id: incoming.id,
        password: incoming.password,
        app: incoming.app
    };
    var clients = opts.clients;

    if (credentials.app === 'client') {
        authenticateClient(credentials, clients, onResult);
    } else {
        authenticateDriver(credentials, clients, onResult);
    }

    function onResult(err, token) {
        if (err) {
            return cb(err);
        }

        cb(null, { token: token });
    }
}
