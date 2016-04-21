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
                    <td>{subject.subject_id}</td> 
                    <td>{subject.name}</td>  
                    <td>{subject.short_name}</td>                                       
                    <td>{subject.number}</td>  
                                      
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#myModal" value="Edit" className="btn btn-success" onClick={SubjectActions.editSubject.bind(null,subject._id)} /></td>
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#deleModal" value="delete" className="btn btn-danger" onClick={SubjectActions.deleteSubject.bind(null,subject._id)} /></td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>                        
                        {subjectList}
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
                   {this.state.name}
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal">Đóng</button>
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal" onClick={SubjectActions.destroy.bind(null,this.state._id)}>DELETE</button>

                  </div>
                </div>
              </div>
            </div>
            </div>
        );
    }
});

module.exports = SubjectList;