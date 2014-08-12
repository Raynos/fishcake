module.exports = authHandler;

function authHandler(incoming, opts, cb) {
    var credentials = {
        id: incoming.id,
        password: incoming.password,
        app: incoming.app
    };
    var auth = opts.services.auth;

    if (credentials.app === 'client') {
        auth.authenticateClient(credentials, onResult);
    } else {
        auth.authenticateDriver(credentials, onResult);
    }

    function onResult(err, token) {
        if (err) {
            return cb(err);
        }

        cb(null, { token: token });
    }
}
