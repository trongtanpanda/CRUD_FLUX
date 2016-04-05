var React = require("react");

var CourseList = React.createClass({

    render: function() {
        var courseList = this.props.courses.map(function(course, index) {
           
            return (
                <tr key={index}>
                    <td>{course.course_id}</td>
                    <td>{course.name}</td>
                    <td>{course.incoming_year}</td> 
                    <td>{course.full}</td>                   
                                       
                   
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
                             <th>Năm bắt đầu</th>
                             <th>Tên đầy đủ</th>                             
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