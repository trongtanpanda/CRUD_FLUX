var React = require("react"),    
    StudentStore = require("../../stores/student-store"),
    StudentActions = require("../../actions/student-action.js");

var StudentForm = React.createClass({
    
    _onClickAdd: function() {
         var student = {
            student_id: this.state.student_id,
            firstname: this.state.firstname,
            midname: this.state.midname,
            lastname: this.state.lastname
        };

        StudentActions.create(student);
        this.setState({
           student_id:"", firstname: "", midname: "", lastname: ""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onClickUpdate: function() {
        var editingStudent = this.state.editingStudent;        
        var user ={
            _id:editingStudent._id,
            student_id: this.state.student_id,
            firstname: this.state.firstname,
            midname: this.state.midname,
            lastname: this.state.lastname
        };
        StudentActions.update(user);
        this.setState({
            student_id:"", firstname: "", midname: "", lastname: ""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onchangId: function(e){        
        this.setState({
            student_id: e.target.value,
        });
    },
    _onchangFirstname: function(e) {
        this.setState({
            firstname: e.target.value, 
        });
    },
    _onchangMidname: function(e) {
        this.setState({
            midname: e.target.value, 
        });
    },
    _onchangLastname: function(e) {
        this.setState({
            lastname: e.target.value, 
        });
    },
    _onEdit: function() {  
        var editingStudent = StudentStore.getEditingStudents();
        this.setState({
            editingStudent: editingStudent,
        });

        if (editingStudent) {
            this.setState({
                student_id: editingStudent.student_id,
                firstname: editingStudent.firstname,
                midname: editingStudent.midname,
                lastname: editingStudent.lastname,
            });
        }
    },
    _onclickClose: function(){       
        this.setState({                        
            student_id: "",
            firstname: "",
            midname:"",
            lastname: "",           
            editingStudent: "",                  
        });
    },
    getInitialState: function() {
            return {
            student_id: "", first: "", midname: "", lastname: "",            
            editingStudent: null,            
        }
    },
    componentDidMount: function() {
        StudentStore.addEditStudentListener(this._onEdit);
    },
    render: function() {
        var btnAdd = ( <button type="button" onClick={this._onClickAdd} className="btn btn-primary">Lưu</button>);
        var btnUpdate = (<button type="button" onClick={this._onClickUpdate} className="btn btn-primary">Update</button>);

        return (
        <div>
            <div className="button" >
            <button type="button" onClick={StudentForm._onclickClose} className="btn btn-primary btn-lg pull-right btn-kind-one" data-toggle="modal" data-target="#myModal">
              Thêm mới
            </button> 
            &nbsp;
            <button type="button"  className="btn btn-success btn-lg pull-right btn-kind-one" data-toggle="modal" data-target="#ecelModal">
              Import from Excel
            </button>   
            </div>   
           <p>&nbsp;</p>              
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" >
                <div className="modal-content" >
                  <div className="modal-header">
                    <button type="button" onClick={this._onclickClose} className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4 className="modal-title" id="myModalLabel">Thêm Sinh Viên mới</h4>
                  </div>
                  <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Mã Sinh viên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.student_id} onChange={this._onchangId} ref="student_id" className="form-control" type="text" placeholder="Mã khoa" ref="title" name="title"/>
                            </div>                       
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Họ</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.firstname} onChange={this._onchangFirstname} ref="firstname" className="form-control" type="text" placeholder="Tên khoa" ref="title" name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên Đệm</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.midname} onChange={this._onchangMidname} ref="midname" className="form-control" type="text" placeholder="Trưởng khoa" ref="title" name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.lastname} onChange={this._onchangLastname} ref="lastname" className="form-control" type="text" placeholder="Giáo vụ" ref="title" name="title"/>
                            </div>
                        </div>                      
                    </form>                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close" onClick={this._onclickClose} className="btn btn-default" data-dismiss="modal">Đóng</button>
                     {this.state.editingStudent ? btnUpdate : btnAdd}
                  </div>
                </div>
              </div>
            </div>             
            
        </div>
        );
    }
});

module.exports = StudentForm;