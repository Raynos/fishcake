var RCSS = require('rcss');

var projectPanel = RCSS.registerClass({
    width: '40%',
    float: 'left'
}).className;

var editorPanel = RCSS.registerClass({
    width: '60%',
    float: 'right'
}).className;

module.exports = {
    projectPanel: projectPanel,
    editorPanel: editorPanel
};
