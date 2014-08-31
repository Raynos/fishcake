var RCSS = require('rcss');

var container = RCSS.registerClass({
    height: '100%'
}).className;

var projectPanel = RCSS.registerClass({
    width: '40%',
    padding: '5px',
    float: 'left',
    height: '100%'
}).className;

var editorPanel = RCSS.registerClass({
    width: '60%',
    float: 'right'
}).className;

module.exports = {
    projectPanel: projectPanel,
    container: container,
    editorPanel: editorPanel
};
