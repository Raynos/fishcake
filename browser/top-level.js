var mercury = require('mercury');
var h = require('mercury').h;
var Router = require('./lib/router.js');
var routeView = require('./lib/route-view.js');
var anchor = require('./lib/route-anchor.js');

var FrameList = require('./frameList/');
var FrameEditor = require('./frameEditor/');

TopLevel.render = render;

module.exports = TopLevel;

function TopLevel() {
    var router = Router();
    var state = mercury.struct({
        route: router.state
    });

    return { state: state };
}

function render(state) {
    return h('div', [
        routeView({
            '/': home.bind(null, state),
            '/frames': FrameList.render.bind(null, state),
            '/frames/:id': FrameEditor.render.bind(null, state)
        }, {
            route: state.route
        })
    ]);
}

function home() {
    return h('ul', [
        h('li', [
            anchor({
                href: '/'
            }, 'Home')
        ]),
        h('li', [
            anchor({
                href: '/frames'
            }, 'Frames')
        ])
    ]);
}
