var React = require('react');
var { Route, DefaultRoute } = require('react-router');

var App = require('./App');
var Main = require('./components/main');
var BeanListPage = require('./components/pages/BeanListPage');
var BeanItemPage = require('./components/pages/BeanItemPage');
var BeanItemEditPage = require('./components/pages/BeanItemEditPage');
var routes = (
    <Route name="home" path='/' handler={App}>
        <DefaultRoute name="beanList" handler={BeanListPage} />
        <Route name='main' path='/main' handler={Main} />
        <Route name="beanItemPage" path="/bean/:beanID" handler={BeanItemPage} />
        <Route name="beanItemEditPage" path="/bean/:beanID/edit" handler={BeanItemEditPage} />
    </Route>
);

module.exports = routes;