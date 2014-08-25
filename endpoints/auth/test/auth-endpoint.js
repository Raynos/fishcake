var test = require('cached-tape');
var MockRequest = require('hammock/request');
var MockResponse = require('hammock/response');

var endpoint = require('../index.js');

var services = {
    auth: {
        authenticateClient: function auth(opts, cb) {
            if (opts.id === 'foo' && opts.password === 'bar') {
                cb(null, 'hello');
            } else if (opts.id === 'foo') {
                cb({
                    statusCode: 400,
                    type: 'auth.common.incorrectPassword'
                });
            } else {
                cb(new Error('unknown user'));
            }
        },
        authenticateDriver: function auth(opts, cb) {
            cb(null, 'hello');
        }
    }
};

test('auth returns token', function t(assert) {
    var called = false;

    var req = MockRequest({
        url: '/login',
        method: 'POST',
        headers: { 'content-type': 'application/json' }
    });
    var res = MockResponse(function onResp(err, resp) {
        assert.ifError(err);

        var body = JSON.parse(resp.body);

        assert.equal(called, true);
        assert.equal(body.token, 'hello');
        assert.equal(resp.statusCode, 200);

        assert.end();
    });

    endpoint(req, res, {
        services: services
    }, function onEndpoint(err) {
        called = true;
        assert.ifError(err);
    });

    req.end(JSON.stringify({
        app: 'client',
        id: 'foo',
        password: 'bar'
    }));
});

test('auth fails with bad password', function t(assert) {
    var req = MockRequest({
        url: '/login',
        method: 'POST',
        headers: { 'content-type': 'application/json' }
    });
    var res = MockResponse(function onResp() {
        assert.fail('should not end');
    });

    endpoint(req, res, {
        services: services
    }, function onEndpoint(err) {
        assert.equal(err.type, 'auth.common.incorrectPassword');
        assert.equal(err.statusCode, 400);

        assert.end();
    });

    req.end(JSON.stringify({
        app: 'client',
        id: 'foo',
        password: 'bad'
    }));
});

test('auth fails with unknown id', function t(assert) {
    var req = MockRequest({
        url: '/login',
        method: 'POST',
        headers: { 'content-type': 'application/json' }
    });
    var res = MockResponse(function onResp() {
        assert.fail('should not end');
    });

    endpoint(req, res, {
        services: services
    }, function onEndpoint(err) {
        assert.equal(err.message, 'unknown user');

        assert.end();
    });

    req.end(JSON.stringify({
        app: 'client',
        id: 'bar',
        password: 'dont care'
    }));
});

test('auth authenticate driver', function t(assert) {
    var called = false;

    var req = MockRequest({
        url: '/login',
        method: 'POST',
        headers: { 'content-type': 'application/json' }
    });
    var res = MockResponse(function onResp(err, resp) {
        assert.ifError(err);

        var body = JSON.parse(resp.body);

        assert.equal(called, true);
        assert.equal(body.token, 'hello');
        assert.equal(resp.statusCode, 200);

        assert.end();
    });

    endpoint(req, res, {
        services: services
    }, function onEndpoint(err) {
        called = true;
        assert.ifError(err);
    });

    req.end(JSON.stringify({
        app: 'driver',
        id: 'bar',
        password: 'dont care'
    }));
});
