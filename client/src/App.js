var React = require('react');
var { RouteHandler, Link } = require('react-router');
var { PropTypes } = React;
var Menu = require('./components/pages/menu');
var App = React.createClass({

    propTypes: {
        params: PropTypes.object.isRequired,
        query: PropTypes.object.isRequired
    },

    render: function() {
        return (
            
            <div>
                <Menu />               
                <RouteHandler {...this.props} />
            </div>
        );
    }
});

module.exports = App;