var mercury = require('mercury');
var cuid = require('cuid');

module.exports = Project;

function Project(opts) {
    return mercury.struct({
        id: cuid(),
        projectName: mercury.value(opts.projectName || ''),
        frames: mercury.array([])
    });
}
