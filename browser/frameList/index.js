var mercury = require('mercury');

var Project = require('../entities/project.js');
// var Frame = require('../entities/frame.js');
var InputComponent = require('../components/input.js');

FrameList.render = require('./render.js');

module.exports = FrameList;

function ListState(frames) {
    return mercury.struct({
        frames: frames,
        projects: mercury.varhash({}),
        projectForm: mercury.struct({
            editing: mercury.value(false),
            text: InputComponent('projectName').state,
            events: {
                addProject: mercury.input(),
                saveProject: mercury.input()
            }
        })
        // errors: mercury.struct({
        //     frameName: mercury.value('')
        // }),
        // frameName: Input('frameName').state,
        // events: {
        //     newFrame: mercury.input()
        // }
    });
}

function FrameList(frames) {
    var state = ListState(frames);

    state.projectForm.events.addProject(addProject);
    state.projectForm.events.saveProject(saveProject);

    return { state: state };

    function addProject() {
        state.projectForm.editing.set(true);
    }

    function saveProject(data) {
        state.projectForm.editing.set(false);
        InputComponent.clear(state.projectForm.text);

        var project = Project({
            projectName: data.projectName
        });
        state.projects.put(data.projectName, project);
    }

    // function addFrame(data) {
    //     if (!data.frameName ||
    //         data.frameName.length <= 0
    //     ) {
    //         state.errors.frameName.set('must supply a name');
    //         return;
    //     }

    //     state.errors.frameName.set('');
    //     Input.clear(state.frameName);
    //     var frame = Frame({
    //         $name: data.frameName
    //     });

    //     state.frames.put(frame.id, frame);
    // }
}
