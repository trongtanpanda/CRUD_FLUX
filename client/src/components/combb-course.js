var React = require("react");
 

var ComboCourse = React.createClass({
    render: function() {
        var courseList = this.props.listCourse.map(function(course) {
            return (
               <option value={course}>{course.name}</option>
            );
        }.bind(this));

        return (
            <div>
               <select>{courseList}</select>
            </div>
        );
    }
});

module.exports = ComboCourse;