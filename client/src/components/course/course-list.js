var React = require("react"),
    CourseStore = require("../../stores/department-store"),
    CoursesActions = require("../../actions/department-action.js");
var CourseList = React.createClass({

    render: function() {
        var courseList = this.props.courses.map(function(course, index) {
           
            return (
                <tr key={index}>
                    <td>{course.course_id}</td>
                    <td>{course.name}</td>
                    
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>
                        <thead>
                          <tr>
                             <th>Mã Khóa</th>
                             <th>Tên Khóa</th>
                                                        
                          </tr>
                        </thead>
                        {courseList}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = CourseList;