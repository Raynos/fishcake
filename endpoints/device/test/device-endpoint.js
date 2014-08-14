var test = require('tape');
var MockRequest = require('hammock/request');
var MockResponse = require('hammock/response');

var endpoint = require('../');

var services = {
    device: {
        getAll: function getAll(cb) {
            cb(null, [
                {
                    id: 0,
                    deviceToken: 'a',
                    userId: 0,
                    type: 'b',
                    name: 'c'
                },
                {
                    id: 1,
                    deviceToken: 'd',
                    userId: 1,
                    type: 'e',
                    name: 'f'
                }
            ]);
        },
        getByUserId: function getByDog(userId, cb) {
            if (userId === 10) {
                cb(null, [
                    {
                        id: 0,
                        deviceToken: 'a',
                        userId: 10,
                        type: 'b',
                        name: 'c'
                    },
                    {
                        id: 2,
                        deviceToken: 'd',
                        userId: 10,
                        type: 'e',
                        name: 'f'
                    }
                ]);
            }
        }
    }
};

test('get items', function t(assert) {
    var called = false;

    var req = MockRequest({
        url: '/',
        method: 'GET'
    });
    var res = MockResponse(function onResp(err, resp) {
        assert.ifError(err);

        var body = JSON.parse(resp.body);

        assert.equal(called, true);
        assert.equal(body.length, 2);
        assert.equal(body[0].id, 0);
        assert.equal(body[1].id, 1);

        assert.end();
    });

    endpoint(req, res, {
        services: services
    }, function onEndpoint(err) {
        called = true;
        assert.ifError(err);
    });
});

test('get items by userId', function t(assert) {
    var called = false;

    var req = MockRequest({
        url: '/?userId=10',
        method: 'GET'
    });

    var res = MockResponse(function onResp(err, resp) {
        assert.ifError(err);

        var body = JSON.parse(resp.body);

        assert.equal(called, true);
        assert.equal(body.length, 2);
        assert.equal(body[0].id, 0);
        assert.equal(body[0].userId, 10);
        assert.equal(body[1].id, 2);
        assert.equal(body[1].userId, 10);

        assert.end();
    });

    endpoint(req, res, {
        services: services
    }, function onEndpoint(err) {
        called = true;
        assert.ifError(err);
    });
});
