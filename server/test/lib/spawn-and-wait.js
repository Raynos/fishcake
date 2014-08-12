var spawn = require('child_process').spawn;
var path = require('path');

var istanbul = path.join(__dirname, '..', '..',
    'node_modules', '.bin', 'istanbul');
var coverageFolder = path.join(__dirname, '..', '..',
    'coverage');
var count = 0;

module.exports = spawnAndWait;

function spawnAndWait(file, args, opts, callback) {
    var proc = spawnChild(file, args, opts);

    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);

    proc.stdout.on('data', function checkListen(chunk) {
        chunk = String(chunk);

        if (chunk.indexOf('listening on port') !== -1) {
            callback();
        }
    });

    return proc;

}

function spawnChild(file, args, opts) {
    /*jshint camelcase: false */
    var isIstanbul = process.env.running_under_istanbul;

    var cmd;
    // istanbul can't actually cover processes that crash.
    // so there is little point as it doesn't add much coverage
    // in the future it will https://github.com/gotwarlost/istanbul/issues/127

    if (isIstanbul) {
        cmd = istanbul + ' cover ' + file + ' --report cobertura' +
            ' --print none' +
            ' --root ' + process.cwd() +
            ' --dir ' + coverageFolder + '/multiple' +
            count + ' -- ' + args;
    } else {
        cmd = 'node ' + file + ' ' + args;
    }

    count++;
    return spawn(cmd, opts);
}
