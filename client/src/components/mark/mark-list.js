var React = require("react"),
    UserStore = require("../../stores/user-store"),
 StudentActions = require("../../actions/student-action.js");
var StudentList = React.createClass({

    render: function() {
        var studentList = this.props.students.map(function(student, index) {
            var course;
            if(!student.course){
             course=<td></td>;
            }else{
             course=   <td>{student.course.name}</td>
            };
            return (
                <tr key={index}>
                    <td>{student.name}</td>                    
                      {course}                  
                    <td className="col-md-1"><input type="button" value="Edit" className="btn btn-success" onClick={StudentActions.editStudent.bind(null,student._id)} /></td>
                    <td className="col-md-1"><input type="button" value="Remove" className="btn btn-danger"  onClick={StudentActions.destroy.bind(null,student._id)}/></td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>
                        {studentList}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = StudentList;