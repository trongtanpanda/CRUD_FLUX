var React = require('react');
var { Route, DefaultRoute } = require('react-router');

var App = require('./App');

var Course = require('./components/course');
var Department = require('./components/department');
var Mark = require('./components/mark');
var Sector = require('./components/sector');
var Student = require('./components/student');
var Subject = require('./components/subject');
var Term_class = require('./components/term_class');
var User = require('./components/user');

var BeanListPage = require('./components/pages/BeanListPage');
var BeanItemPage = require('./components/pages/BeanItemPage');
var BeanItemEditPage = require('./components/pages/BeanItemEditPage');


var routes = (
    <Route name="home" path='/' handler={App}>
        <DefaultRoute name='beanList' handler={BeanListPage} />

        <Route name="course"        path="/course"      handler={Course} />
        <Route name="department"    path="/department"  handler={Department} />
        <Route name="mark"          path="/mark"        handler={Mark} />
        <Route name="sector"        path="/sector"      handler={Sector} />
        <Route name="student"       path="/student"     handler={Student} />
        <Route name="subject"       path="/subject"     handler={Subject} />
        <Route name="term_class"    path="/term_class"  handler={Term_class} />
        <Route name="user"          path="/user"        handler={User} />

        <Route name="beanItemPage" path="/bean/:beanID" handler={BeanItemPage} />       
        <Route name="beanItemEditPage" path="/bean/:beanID/edit" handler={BeanItemEditPage} />
    </Route>
);

module.exports = routes;