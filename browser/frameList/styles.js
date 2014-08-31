var RCSS = require('rcss');

var projectList = RCSS.registerClass({
    border: '1px solid black',
    padding: '10px',
    height: '100%'
}).className;

module.exports = {
    projectList: projectList
};
