var path = require('path');
var mountEndpoint = require('sirvice/endpoint.js');

var handlers = require('./handlers.js');

module.exports = mountEndpoint(
    path.join(__dirname, '..'),
    require('./specs/spec.json'),
    {
        queryAll: handlers.queryAll,
        create: handlers.create,
        getOne: handlers.getOne,
        update: handlers.update,
        destroy: handlers.destroy
    }
);
