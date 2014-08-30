var mercury = require('mercury');
var h = require('mercury').h;

var menu = require('../views/menu.js');

FrameEditor.render = render;

module.exports = FrameEditor;

function FrameEditor(frames) {
    var state = mercury.struct({
        frames: frames
    });

    return { state: state };
}

function render(state, params) {
    var id = params.id;
    var frame = state.frames[id];

    return h('div', [
        menu(),
        h('h2', 'frameEditor'),
        h('div', [
            h('label', [
                'Name: ',
                frame.$name
            ])
        ])
    ]);
}
