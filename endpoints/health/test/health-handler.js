var test = require('tape');

var health = require('../health.js');

test('health returns OK', function t(assert) {
    health({}, {}, function onHealth(err, value) {
        assert.ifError(err);

        assert.equal(value, 'OK');

        assert.end();
    });
});
