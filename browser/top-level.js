var mercury = require('mercury');
var h = require('mercury').h;
var Router = require('./lib/router.js');
var routeView = require('./lib/route-view.js');

var menu = require('./views/menu.js');
var FrameList = require('./frameList/');
var FrameEditor = require('./frameEditor/');

TopLevel.render = render;

module.exports = TopLevel;

function TopLevel() {
    var router = Router();
    var frameList = FrameList();

    var state = mercury.struct({
        route: router.state,
        frameList: frameList.state
    });

    return { state: state };
}

function render(state) {
    return h('div', [
        routeView({
            '/': home.bind(null, state),
            '/frames': FrameList.render.bind(
                null, state.frameList),
            '/frames/:id': FrameEditor.render.bind(
                null, state)
        }, {
            route: state.route
        })
    ]);
}

function home() {
    return menu();
}
