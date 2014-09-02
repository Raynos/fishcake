var mercury = require('mercury');
var h = require('mercury').h;

var FrameList = require('./frameList/');
var FrameEditor = require('./frameEditor/');

var styles = require('./top-styles.js');

TopLevel.render = render;

module.exports = TopLevel;

function TopLevel() {
    var frames = mercury.varhash({});
    var frameList = FrameList();
    var frameEditor = FrameEditor();

    var state = mercury.struct({
        frameList: frameList.state,
        frameEditor: frameEditor.state,
        frames: frames
    });

    frameList.newFrame(function onFrame(frame) {
        console.log('storing frames?', frame);
        frames.put(frame.id, frame);
    });

    return { state: state };
}

function render(state) {
    console.log('state.frames', state.frames);

    return h('.' + styles.container, [
        h('.' + styles.projectPanel, [
            FrameList.render(state.frameList, state.frames)
        ]),
        h('.' + styles.editorPanel, [
            FrameEditor.render(state.frameEditor, state.frames)
        ])
    ]);
}
