var hg = require('mercury');
var h = require('mercury').h;
var FocusHook = require('virtual-hyperscript/hooks/focus-hook');

var styles = require('./styles.js');
var InputComponent = require('../components/input.js');

module.exports = render;

function render(state) {
    // var framesList = Object.keys(state.frames)
    //     .map(function toValue(key) {
    //         return state.frames[key];
    //     });

    // var projectNames = computeProjectNames(state.frames);

    return h('.' + styles.projectList, [
        h('h2', 'Project List'),
        h('ul.projects', mapObject(state.projects,
                renderProject.bind(null, state))),
        addProjectForm(state.projectForm)
    ]);
}

function renderProject(state, project) {
    return h('li', [
        h('span', project.projectName)
    ]);
}

function addProjectForm(state) {
    var addProject = state.events.addProject;
    var saveProject = state.events.saveProject;

    return h('div.project-form', [
        h('label', {
            hidden: !state.editing,
            'ev-event': hg.submitEvent(saveProject)
        }, [
            h('span', 'Project Name'),
            InputComponent.render(state.text, {
                'data-hook': state.editing ? FocusHook() : null
            })
        ]),
        h('button.add-project', {
            'ev-click': hg.event(addProject)
        }, '+')
    ]);
}

function mapObject(obj, fn) {
    var keys = Object.keys(obj);

    return keys.map(function toValue(key) {
        return fn ? fn(obj[key]) : obj[key];
    });
}

// function render(state) {
//     var newFrame = state.events.newFrame;
//     var frames = Object.keys(state.frames)
//         .map(function getValue(k) {
//             return state.frames[k];
//         });

//     return h('div', [
//         h('h2', 'frameList'),
//         h('ul', frames.map(showFrame)),
//         h('div', {
//             'ev-event': mercury.submitEvent(newFrame)
//         }, [
//             h('label', [
//                 'Frame name: ',
//                 Input.render(state.frameName),
//                 h('div', [
//                     state.errors.frameName || null
//                 ])
//             ]),
//             h('button', 'Add a new frame')
//         ])
//     ]);
// }

// function showFrame(frame) {
//     return h('li', [
//         h('div', [
//             h('label', [
//                 h('span', 'Frame: '),
//                 h('span', frame.$name),
//                 h('span', 'Edit frame')
//             ])
//         ])
//     ]);
// }
