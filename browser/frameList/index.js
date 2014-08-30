var mercury = require('mercury');
var h = require('mercury').h;

var menu = require('../views/menu.js');

FrameList.render = render;

module.exports = FrameList;

function FrameList() {
    var state = mercury.struct({
        frames: mercury.array([])
    });

    return { state: state };
}

function render(state) {
    return h('div', [
        menu(),
        'frameList'
    ]);
}
