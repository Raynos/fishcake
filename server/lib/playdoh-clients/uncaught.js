var os = require('os');
var uncaught = require('playdoh-server/uncaught');

module.exports = createUncaught;

function createUncaught(config, clients) {
    return uncaught({
        logger: clients.logger,
        prefix: [
            config.get('project'),
            process.env.NODE_ENV,
            os.hostname().split('.')[0]
        ].join('.') + ' ',
        backupFile: config.get('playdoh-uncaught.backupFile')
    });
}
