var crypto = require('crypto');

var IncorrectPassword = require('./errors').IncorrectPassword;

module.exports = authClient;

function authClient(credentials, clients, cb) {
    var id = credentials.id;
    var password = credentials.password;

    clients.onClient.fetch('clientAuth', id, {}, onClient);

    function onClient(err, data) {
        if (err) {
            return cb(err);
        }

        if (!checkPassword(password, data.password)) {
            return cb(IncorrectPassword());
        }

        cb(null, data.token);
    }
}

function checkPassword(password, realPassword) {
    return realPassword === password ||
        realPassword === hash(password);
}

function hash(str) {
    str = str || '';
    var hashCombo = '';

    for (var i = 0; i < str.length; i++) {
        hashCombo += crypto.createHash('md5')
            .update(str[i]).digest('hex');
    }

    return crypto.createHash('md5')
        .update(hashCombo).digest('hex');
}
