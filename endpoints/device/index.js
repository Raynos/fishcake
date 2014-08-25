var path = require('path');
var mountEndpoint = require('sirvice/endpoint.js');

var handlers = require('./handlers.js');

module.exports = mountEndpoint({
    endpointDir: path.join(__dirname, '..'),
    spec: require('./specs/spec.json'),
    handlers: {
        queryAll: handlers.queryAll,
        create: handlers.create,
        getOne: handlers.getOne,
        update: handlers.update,
        destroy: handlers.destroy
    }
});
