var test = require('cached-tape');
var MockRequest = require('hammock/request');
var MockResponse = require('hammock/response');

var endpoint = require('../index.js');

test('endpoint is a function', function t(assert) {
    assert.equal(typeof endpoint, 'function');

    assert.end();
});

test('endpoint writes to response', function t(assert) {
    var called = false;

    endpoint(
        MockRequest({ url: '/supply', method: 'POST' }),
        MockResponse(function onResponse(err, resp) {
            assert.ifError(err);

            assert.equal(called, true);
            assert.equal(resp.body, '{}');

            assert.end();
        }),
        {},
        function onEndpoint(err) {
            called = true;
            assert.ifError(err);
        });
});
