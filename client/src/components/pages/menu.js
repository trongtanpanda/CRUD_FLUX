var React = require('react');

// Editing beans is not implemented yet
// Todo: Make the edit page
var { Link } = require('react-router');
var menu = React.createClass({

    render: function() {
        return (
           <div id="header"> 
		        <div className="btn-group btn-group-justified">
		            <div className="btn-group">
		            	<Link to='/main'>
			                <button type="button" className="btn btn-nav"><span className="glyphicon glyphicon-home"></span>
			                <p>Home</p>

			                </button>
		                </Link>
		            </div>
		            <div className="btn-group">
		            	<Link to='/objects'>
			                <button type="button" className="btn btn-nav">
			                    <span className="glyphicon glyphicon-camera"></span>
			                    <p>Photos</p>
			                </button>
		                </Link>
		            </div>
		            <div className="btn-group">
		                <button type="button" className="btn btn-nav">
		                    <span className="glyphicon glyphicon-gift"></span>
		                    <p>Freebies</p>
		                </button>
		            </div>
		            <div className="btn-group">
		                <button type="button" className="btn btn-nav">
		                    <span className="glyphicon glyphicon-briefcase"></span>
		                    <p>Work</p>
		                </button>
		            </div>
		            <div className="btn-group">
		                <button type="button" className="btn btn-nav">
		                    <span className="glyphicon glyphicon-link"></span>
		                    <p>Other Links</p>
		                </button>
		            </div>
		            <div className="btn-group">
		                <button type="button" className="btn btn-nav">
		                    <span className="glyphicon glyphicon-credit-card"></span>
		                    <p>Payments</p>
		                </button>
		            </div>
		        </div>
		    </div>
        );
    }
});

module.exports = menu;

