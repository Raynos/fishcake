var path = require('path');
var mountEndpoint = require('./lib/mount-endpoint.js');

var handlers = require('./handlers.js');

var specs = {
    read: {
        'index': {
            handler: handlers.queryAll,
            schema: {
                '1.0.0': 'http://demo.uber.com/spec/device-query-all-v1.0.0'
            }
        }
    },
    create: {
        'index': {
            handler: handlers.create,
            schema: {
                '1.0.0': 'http://demo.uber.com/spec/device-create-v1.0.0'
            }
        }
    },
    item: {
        params: ['id'],
        read: {
            'index': {
                handler: handlers.getOne,
                schema: {
                    '1.0.0': 'http://demo.uber.com/spec/device-get-one-v1.0.0'
                }
            }
        },
        update: {
            'index': {
                handler: handlers.update,
                schema: {
                    '1.0.0': 'http://demo.uber.com/spec/device-update-v1.0.0'
                }
            }
        },
        destroy: {
            'index': {
                handler: handlers.destroy,
                schema: {
                    '1.0.0': 'http://demo.uber.com/spec/device-remove-v1.0.0'
                }
            }
        }
    }
};

module.exports = mountEndpoint(
    path.join(__dirname, '..', '..'), specs);
