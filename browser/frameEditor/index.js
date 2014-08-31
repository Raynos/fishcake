var mercury = require('mercury');
var h = require('mercury').h;

FrameEditor.render = render;

module.exports = FrameEditor;

function FrameEditor(frames) {
    var state = mercury.struct({
        frames: frames
    });

    return { state: state };
}

function render() {
    return h('div', 'frameEditor');
}
