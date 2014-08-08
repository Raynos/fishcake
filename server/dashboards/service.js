var graph = require('graphite-dash-gen').mkGraph;
var t = require('graphite-dash-gen').mkTarget;
var Dashboard = require('graphite-dash-gen').Dashboard;
var Dash = require('graphite-dash-gen');

function serviceDashboard(opts) {
    var processName = opts.team + '-' + opts.project +
        '-on-' + opts.serverName;

    return new Dashboard(opts.team + '-' + opts.project, [
        graph('Service CPU',[
            t('servers.%s.nodejs.%s.cpu.user',
                opts.serverName, processName)
        ]),
        Dash.weekComparisonGraph('Number of FDs', {
            yMin: 0,
            hideLegend: 'true'
        }, [
            t('servers.%s.nodejs.%s.num_fds',
                opts.serverName, processName)
        ])
    ]);
}

var dashboard = serviceDashboard({
    team: 'rt',
    project: 'my-test',
    serverName: 'app01-peak1'
});

module.exports = dashboard;
