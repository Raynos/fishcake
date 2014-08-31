var mercury = require('mercury');
var cuid = require('cuid');

module.exports = Frame;

function Frame(opts) {
    return mercury.struct({
        id: cuid(),
        $name: mercury.value(opts.$name || ''),
        projectName: mercury.value(opts.projectName || '')
    });
}
