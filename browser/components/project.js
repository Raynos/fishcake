var mercury = require('mercury');
var cuid = require('cuid');

var AddItemForm = require('./add-item-form.js');
var Frame = require('../entities/frame.js');

module.exports = Project;

function Project(opts, frames) {
    var frameForm = AddItemForm();
    
    var state = mercury.struct({
        id: cuid(),
        projectName: mercury.value(opts.projectName || ''),
        frames: mercury.array([]),
        frameForm: frameForm.state
    });

    frameForm.newItem(function (data) {
        var frame = Frame({
            $name: data.value,
            projectName: state.projectName()
        });
        frames.put(frame.id, frame);
        state.frames.push(frame.id);
    });

    return { state: state };
}
