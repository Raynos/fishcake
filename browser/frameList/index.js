var mercury = require('mercury');
var h = require('mercury').h;
var anchor = require('../lib/route-anchor.js');

var Frame = require('../entities/frame.js');
var Input = require('../components/input.js');
var menu = require('../views/menu.js');

FrameList.render = render;

module.exports = FrameList;

function FrameList(frames) {
    var state = mercury.struct({
        frames: frames,
        errors: mercury.struct({
            frameName: mercury.value('')
        }),
        frameName: Input('frameName').state,
        events: {
            newFrame: mercury.input()
        }
    });

    state.events.newFrame(addFrame);

    return { state: state };

    function addFrame(data) {
        if (!data.frameName ||
            data.frameName.length <= 0
        ) {
            state.errors.frameName.set('must supply a name');
            return;
        }

        state.errors.frameName.set('');
        Input.clear(state.frameName);
        var frame = Frame({
            $name: data.frameName
        });

        state.frames.put(frame.id, frame);
    }
}

function render(state) {
    var newFrame = state.events.newFrame;
    var frames = Object.keys(state.frames)
        .map(function getValue(k) {
            return state.frames[k];
        });

    return h('div', [
        menu(),
        h('h2', 'frameList'),
        h('ul', frames.map(showFrame)),
        h('div', {
            'ev-event': mercury.submitEvent(newFrame)
        }, [
            h('label', [
                'Frame name: ',
                Input.render(state.frameName),
                h('div', [
                    state.errors.frameName || null
                ])
            ]),
            h('button', 'Add a new frame')
        ])
    ]);
}

function showFrame(frame) {
    return h('li', [
        h('div', [
            h('label', [
                h('span', 'Frame: '),
                h('span', frame.$name),
                anchor({
                    href: '/frames/' + frame.id
                }, 'Edit frame')
            ])
        ])
    ]);
}
