var React = require("react"),
    UserStore = require("../../stores/user-store"),
    StudentActions = require("../../actions/student-action.js");
var Confirm = require('react-confirm-bootstrap');
var StudentList = React.createClass({

    render: function() {
        var studentList = this.props.students.map(function(student, index) {
          
            return (
                <tr key={index}>
                    <td>{student.student_id}</td> 
                    <td>{student.lastname} {student.midname} {student.firstname}</td>                                       
                                      
                    <td className="col-md-1"><input type="button" value="Edit" className="btn btn-success" onClick={StudentActions.editStudent.bind(null,student._id)} /></td>
                    <td className="col-md-1"><Confirm
                    onConfirm={this.onConfirm}
                    body="Are you sure you want to delete this?"
                    confirmText="Confirm Delete"
                    title="Deleting Stuff">
                    <button>Delete Stuff</button>
                </Confirm></td>
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