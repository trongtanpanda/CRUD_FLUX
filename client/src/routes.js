var React = require('react');
var { Route, DefaultRoute } = require('react-router');

var App = require('./App');

var Course = require('./components/course');
var Department = require('./components/department');
var Mark = require('./components/mark');
var Sector = require('./components/sector');
var Student = require('./components/student');
var Subject = require('./components/subject');
var Termclass = require('./components/termclass');
var User = require('./components/user');
var Clss = require('./components/clss');
var routes = (
    <Route name="home" path='/' handler={App}>

        <Route name="course"        path="/course"      handler={Course} />
        <Route name="department"    path="/department"  handler={Department} />
        <Route name="mark"          path="/mark"        handler={Mark} />
        <Route name="sector"        path="/sector"      handler={Sector} />
        <Route name="student"       path="/student"     handler={Student} />
        <Route name="subject"       path="/subject"     handler={Subject} />
        <Route name="termclass"    path="/termclass"  handler={Termclass} />
        <Route name="user"          path="/user"        handler={User} />
        <Route name="clss"          path="/clss"        handler={Clss} />
    </Route>
);

module.exports = routes;