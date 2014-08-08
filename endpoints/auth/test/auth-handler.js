var test = require('tape');

var auth = require('../auth.js');

var onClient = {
    fetch: function fetch(key, id, opts, cb) {
        if (id === 'foo') {
            cb(null, {
                password: 'bar',
                token: 'hello'
            });
        } else {
            cb(new Error('unknown user'));
        }
    }
};

test('auth returns token', function t(assert) {
    auth({
        app: 'client',
        id: 'foo',
        password: 'bar'
    }, {
        clients: {
            onClient: onClient
        }
    }, function onAuth(err, result) {
        assert.ifError(err);

        assert.equal(result.token, 'hello');

        assert.end();
    });
});

test('auth fails with bad password', function t(assert) {
    auth({
        app: 'client',
        id: 'foo',
        password: 'bad'
    }, {
        clients: {
            onClient: onClient
        }
    }, function onAuth(err, result) {
        assert.ok(err);
        assert.equal(err.type, 'auth.common.incorrectPassword');
        assert.equal(err.statusCode, 400);

        assert.equal(result, undefined);

        assert.end();
    });
});

test('auth fails with unknown id', function t(assert) {
    auth({
        app: 'client',
        id: 'bar'
    }, {
        clients: {
            onClient: onClient
        }
    }, function onAuth(err, result) {
        assert.ok(err);
        assert.equal(err.message, 'unknown user');

        assert.equal(result, undefined);

        assert.end();
    });
});
