var React = require("react"),
    SubjectStore = require("../../stores/subject-store"),
    SubjectActions = require("../../actions/subject-action.js");
var Confirm = require('react-confirm-bootstrap');
var SubjectList = React.createClass({
     _onDelete: function() {        
        var deletingSubject = SubjectStore.getDeleteSubject();
        // console.log(editingSubject);
        this.setState({
            deletingSubject: deletingSubject,
        });

        if (deletingSubject) {
            this.setState({
                name: deletingSubject.name,
                _id: deletingSubject._id,
            });
        }
    },
    getInitialState: function() {
            return {
            name: "",            
            deletingSubject: null, 
            id: null,           
        }
    },
    componentDidMount: function() {
        SubjectStore.addDeleteSubjectListener(this._onDelete);
    },
    render: function() {
        var subjectList = this.props.subjects.map(function(subject, index) {
          
            return (
                <tr key={index}>
                    <td>{index +1}</td>
                    <td>{subject.subject_id}</td> 
                    <td>{subject.name}</td>  
                    <td>{subject.short_name}</td>                                       
                    <td>{subject.number}</td>  
                                      
                    <td>
                        <button type="button" data-toggle="modal" data-target="#myModal"  className="btn btn-success light-blue accent-4 glyphicon glyphicon-pencil" onClick={SubjectActions.editSubject.bind(null,subject._id)} ></button>
                        &nbsp;
                        <button type="button" data-toggle="modal" data-target="#deleModal"  className="btn btn-danger red accent-2 glyphicon glyphicon-trash" onClick={SubjectActions.deleteSubject.bind(null,subject._id)} ></button>
                   </td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>    
                        <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã môn học</th>
                            <th>Tên môn học</th>
                            <th>Tên viết tắt</th>
                            <th>Số tín chỉ</th> 
                            
                            <th>&nbsp;</th>                            
                        </tr>
                    </thead>                    
                        {subjectList}
                    </tbody>
                </table>
                   <div className="modal fade" id="deleModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" >
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button"  className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4 className="modal-title" id="myModalLabel">Xóa môn học</h4>
                  </div>
                  <div className="modal-body">
                   Bạn có chắc muốn xóa lớp {this.state.name}?
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal">Đóng</button>
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal" onClick={SubjectActions.destroy.bind(null,this.state._id)}>Xóa</button>

                  </div>
                </div>
              </div>
            </div>
            </div>
        );
    }
});

module.exports = SubjectList;