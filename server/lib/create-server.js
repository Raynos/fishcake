var http = require('http');
var STATUS_CODES = http.STATUS_CODES;
var perf = require('playdoh-server/perf');
var sendJson = require('send-data/json');
var url = require('url');

module.exports = createServer;

function createServer(handler, opts) {
    // boot your app here
    var server = http.createServer(routeHandler);
    var config = opts.config;
    var clients = opts.clients;

    //TODO replace me with decent logger
    server.on('request', function onRequest(req) {
        clients.logger.info('got request', {
            uri: req.url
        });
    });

    server.perfServer = perf(config.get('perfSettings'));

    server.on('listening', function onListen() {
        clients.logger.info('listening on port', {
            port: config.get('port')
        });
    });

    var errOpts = {
        // verbose is true in dev where it prints stacks
        // when verbose is false it wont print stacks
        verbose: config.get('playdoh-api.error.verbose') || false
    };

    return server;

    function routeHandler(req, res) {
        res.setHeader('X-Uber-App', config.get('project'));

        return handler(req, res, {
            config: config,
            clients: clients
        }, defaultErrorHandler);

        /*
            type TypedError : {
                message: String,
                statusCode?: Number,
                type?: String,
                stack?: String,
                expected?: Boolean,
                messages?: Array<String>
            }

            defaultErrorHandler : (err?: TypedError) => void
        */
        function defaultErrorHandler(err) {
            var parsedUrl = url.parse(req.url);
            var statsdKey = 'playdoh-api.error-handler.' +
                parsedUrl.pathname;

            if (err) {
                if (err.expected) {
                    if (clients.statsd) {
                        clients.statsd.increment(statsdKey + '.expected');
                    }
                    sendExpectedError(req, res, err, errOpts);
                } else {
                    clients.logger.error('unexpected error', err);
                    if (clients.statsd) {
                        clients.statsd.increment(statsdKey + '.unexpected');
                    }
                    sendUnexpectedError(req, res, err, errOpts);
                }
            } else if (clients.statsd) {
                clients.statsd.increment(statsdKey + '.ok');
            }
        }
    }
}

function sendExpectedError(req, res, err, opts) {
    var statusCode = err.statusCode || 500;
    var body = {
        message: err.message || STATUS_CODES[statusCode] ||
            STATUS_CODES[500]
    };

    if (typeof err.type === 'string') {
        body.type = err.type;
    }

    if (Array.isArray(err.messages)) {
        body.messages = err.messages;
    }

    if (opts.verbose) {
        body.stack = err.stack;
        body.expected = err.expected;
    }

    sendJson(req, res, {
        statusCode: statusCode,
        body: body
    });
}

function sendUnexpectedError(req, res, err, opts) {
    var statusCode = err.statusCode || 500;

    var body = {
        message: STATUS_CODES[statusCode] ||
            STATUS_CODES[500]
    };

    if (opts.verbose) {
        body.message = err.message || body.message;
        body.stack = err.stack;
        body.unexpected = err.expected;
    }

    sendJson(req, res, {
        statusCode: statusCode,
        body: body
    });
}
