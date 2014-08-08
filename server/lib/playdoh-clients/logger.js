var os = require('os');
var Logger = require('playdoh-server/logger');

function createLogger(config, clients) {
    return Logger({
        meta: {
            team: config.get('team'),
            project: config.get('project'),
            hostname: os.hostname(),
            pid: process.pid
        },
        backends: Logger.defaultBackends(
            config.get('playdoh-logger'), clients)
    });
}

module.exports = createLogger;
