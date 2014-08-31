var mercury = require('mercury');

var Project = require('../components/project.js');
var AddItemForm = require('../components/add-item-form.js');

FrameList.render = require('./render.js');

module.exports = FrameList;

function FrameList(frames) {
    var projectForm = AddItemForm();

    var state = mercury.struct({
        frames: frames,
        projects: mercury.varhash({}),
        projectForm: projectForm.state
    });

    projectForm.newItem(function (data) {
        var project = Project({
            projectName: data.value
        }, frames);
        state.projects.put(project.state.id, project.state);
    });

    return { state: state };
}
