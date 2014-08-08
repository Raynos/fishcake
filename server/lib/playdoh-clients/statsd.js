var os = require('os');
var Statsd = require('playdoh-server/statsd');

module.exports = createStatsd;

function createStatsd(config) {
    var opts = config.get('playdoh-statsd');

    return opts ? Statsd({
        host: opts.host,
        port: opts.port,
        scope: [
            config.get('project'),
            process.env.NODE_ENV,
            os.hostname().split('.')[0]
        ].join('.')
    }) : null;
}
