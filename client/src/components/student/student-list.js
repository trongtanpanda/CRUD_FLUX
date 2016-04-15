var React = require("react"),
    StudentStore = require("../../stores/student-store"),
    StudentActions = require("../../actions/student-action.js");
var Confirm = require('react-confirm-bootstrap');
var StudentList = React.createClass({
     _onDelete: function() {        
        var deletingStudent = StudentStore.getDeleteStudent();
        // console.log(editingStudent);
        this.setState({
            deletingStudent: deletingStudent,
        });

        if (deletingStudent) {
            this.setState({
                firstname: deletingStudent.firstname,
                _id: deletingStudent._id,
            });
        }
    },
    getInitialState: function() {
            return {
            firstname: "",            
            deletingStudent: null, 
            id: null,           
        }
    },
    componentDidMount: function() {
        StudentStore.addDeleteStudentListener(this._onDelete);
    },
    render: function() {
        var studentList = this.props.students.map(function(student, index) {
          
            return (
                <tr key={index}>
                    <td>{student.student_id}</td> 
                    <td>{student.firstname} {student.midname} {student.lastname}</td>                                       
                                      
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#myModal" value="Edit" className="btn btn-success" onClick={StudentActions.editStudent.bind(null,student._id)} /></td>
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#deleModal" value="delete" className="btn btn-danger" onClick={StudentActions.deleteStudent.bind(null,student._id)} /></td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>
                        <thead>
                          <tr>
                             <th>Mã sinh viên</th>
                             <th>Tên sinh viên</th>                             
                             <th></th>
                             <th></th>
                          </tr>
                        </thead>
                        {studentList}
                    </tbody>
                </table>
                   <div className="modal fade" id="deleModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" >
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button"  className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4 className="modal-title" id="myModalLabel">Thêm khoa mới</h4>
                  </div>
                  <div className="modal-body">
                   {this.state.firstname}
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal">Đóng</button>
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal" onClick={StudentActions.destroy.bind(null,this.state._id)}>DELETE</button>

                  </div>
                </div>
              </div>
            </div>
            </div>
        );
    }
});

module.exports = StudentList;