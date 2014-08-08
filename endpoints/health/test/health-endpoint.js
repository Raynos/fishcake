var test = require('tape');
var MockRequest = require('hammock/request');
var MockResponse = require('hammock/response');

var endpoint = require('../index.js');

test('endpoint is a function', function t(assert) {
    assert.equal(typeof endpoint, 'function');

    assert.end();
});
