var React = require('react');
var { Route, DefaultRoute } = require('react-router');

var App = require('./App');
var Main = require('./components/main');
var BeanListPage = require('./components/pages/BeanListPage');
var OJ = require('./components/objects');
var BeanItemEditPage = require('./components/pages/BeanItemEditPage');
var routes = (
    <Route name="home" path='/' handler={App}>
        <DefaultRoute name="beanList" handler={BeanListPage} />
        <Route name='main' path="/main" handler={Main} />
        <Route name='objects' path="/objects" handler={OJ} />
        <Route name="beanItemEditPage" path="/bean/:beanID/edit" handler={BeanItemEditPage} />
    </Route>
);

module.exports = routes;