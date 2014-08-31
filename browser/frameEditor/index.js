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

function render(state) {
    return h('div', [
        windowTabs(state)
    ]);
}

function windowTabs(state) {
    var openFrames = Object.keys(state.frames)
        .map(toOpenFrame).filter(Boolean);

    return h('div.window-tabs', openFrames.map(windowTab));

    function toOpenFrame(key) {
        var frame = state.frames[key];

        return frame.viewState.open ? frame : null;
    }
}

function windowTab(frame) {
    return h('div.window-tabs-tab', [
        h('span', frame.$name),
        h('a.close-tab', 'x')
    ]);
}
