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
		            	<Link to='/student'>
			                <button type="button" className="btn btn-nav">
			                	<span className="glyphicon glyphicon-user"></span>
			                <p>Sinh Viên</p>

			                </button>
		                </Link>
		            </div>
		            <div className="btn-group">
		            	<Link to='/subject'>
			                <button type="button" className="btn btn-nav">
			                    <span className="glyphicon glyphicon-book"></span>
			                    <p>Môn Học</p>
			                </button>
		                </Link>
		            </div>
		            <div className="btn-group">
		            	<Link to='/sector'>
			                <button type="button" className="btn btn-nav">
			                    <span className="glyphicon glyphicon-road"></span>
			                    <p>Ngành</p>
			                </button>
			            </Link>
		            </div>
		            	<div className="btn-group">
			            	<Link to='/mark'>
			                <button type="button" className="btn btn-nav">
			                    <span className="glyphicon glyphicon-list-alt"></span>
			                    <p>Điểm</p>
			                </button>
			            </Link>
		            </div>
		            <div className="btn-group">
		            	<Link to='/termclass'>
			                <button type="button" className="btn btn-nav">
			                    <span className="glyphicon glyphicon-link"></span>
			                    <p>Lớp học phần</p>
			                </button>
		                </Link>
		            </div>
		            <div className="btn-group">
		            	<Link to='/clss'>
			                <button type="button" className="btn btn-nav">
			                    <span className="glyphicon glyphicon-tags"></span>
			                    <p>Lớp sinh hoạt</p>
			                </button>
		                </Link>
		            </div>
		        </div>
		    </div>
        );
    }
});

module.exports = menu;

