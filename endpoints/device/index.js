var path = require('path');
var mountEndpoint = require('./lib/mount-endpoint');

var handlers = require('./handlers.js');
var specs = {
    read: {
        'index': {
            handler: handlers.queryAll,
            schema: {
                '1.0.0': require('./specs/query-all-v1.0.0.json')
            }
        }
    },
    create: {
        'index': {
            handler: handlers.create,
            schema: {
                '1.0.0': require('./specs/create-v1.0.0.json')
            }
        }
    },
    item: {
        params: ['id'],
        read: {
            'index': {
                handler: handlers.getOne,
                schema: {
                    '1.0.0': require('./specs/get-one-v1.0.0.json')
                }
            }
        },
        update: {
            'index': {
                handler: handlers.update,
                schema: {
                    '1.0.0': require('./specs/update-v1.0.0.json')
                }
            }
        },
        destroy: {
            'index': {
                handler: handlers.destroy,
                schema: {
                    '1.0.0': require('./specs/remove-v1.0.0.json')
                }
            }
        }
    }
};

module.exports = mountEndpoint(__dirname, specs, {
    jsigDefinition: path.join(__dirname, 'spec.jsig')
});
