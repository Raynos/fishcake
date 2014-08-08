var test = require('tape');
var request = require('request');
var format = require('util').format;

var createServer = require('../server.js');

var server = createServer({
    logger: console,
    get: function fakeGet(key) {
        switch (key) {
            case 'perfSettings': {
                return {};
            }
        }
    }
});
var PORT = Number(process.env.TEST_PORT || 8065);
var URI = format('http://localhost:%d', PORT);

test('createServer is a function', function (assert) {
    assert.equal(typeof createServer, 'function');
    assert.end();
});

test('setup a server', function (assert) {
    server.listen(PORT);
    assert.end();
});

// DO NOT delete this test. this is a required test.
test('server respects /health', function (assert) {
    request(URI + '/health', function (err, res) {
        assert.ifError(err);

        assert.ok(res);
        assert.equal(res.statusCode, 200);
        assert.equal(res.body, 'OK');
        assert.equal(res.headers['x-uber-app'], 'my-test');
        assert.end();
    });
});

test('teardown a server', function (assert) {
    server.close();
    assert.end();
});
