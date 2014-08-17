var test = require('tape');

var auth = require('../auth/');

var clients = {
    onClient: {
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
    }
};

test('auth returns token', function t(assert) {
    var service = auth(clients);

    service.authenticateClient({
        app: 'client',
        id: 'foo',
        password: 'bar'
    }, function onAuth(err, result) {
        assert.ifError(err);

        assert.equal(result, 'hello');

        assert.end();
    });
});

test('auth fails with bad password', function t(assert) {
    var service = auth(clients);

    service.authenticateClient({
        app: 'client',
        id: 'foo',
        password: 'bad'
    }, function onAuth(err, result) {
        assert.ok(err);
        assert.equal(err.type, 'auth.common.incorrectPassword');
        assert.equal(err.statusCode, 400);

        assert.equal(result, undefined);

        assert.end();
    });
});

test('auth fails with unknown id', function t(assert) {
    var service = auth(clients);

    service.authenticateClient({
        app: 'client',
        id: 'bar'
    }, function onAuth(err, result) {
        assert.ok(err);
        assert.equal(err.message, 'unknown user');

        assert.equal(result, undefined);

        assert.end();
    });
});

test('auth authenticate driver', function t(assert) {
    var service = auth(clients);

    service.authenticateDriver({
        app: 'client',
        id: 'bar'
    }, function onAuth(err, result) {
        assert.ok(err);
        assert.equal(err.message, 'Not Implemented');

        assert.equal(result, undefined);

        assert.end();
    });
});
