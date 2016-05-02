var React = require("react"),    
    StudentStore = require("../../stores/student-store"),
    StudentActions = require("../../actions/student-action.js");

var StudentForm = React.createClass({
    
    _onClickAdd: function() {
         var student = {
            student_id: this.state.student_id,
            firstname: this.state.firstname,            
            lastname: this.state.lastname,
            gender: this.state.gender,
            native: this.state.native,
            birthday: this.state.birthday
        };

        StudentActions.create(student);
        this.setState({
           student_id:"", firstname: "", midname: "", lastname: "", gender: "", native: "", birthday:""
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
            lastname: this.state.lastname,
            gender: this.state.gender,
            native: this.state.native,
            birthday: this.state.birthday
        };
        StudentActions.update(user);
        this.setState({
            student_id:"", firstname: "", midname: "", lastname: "", gender: "", native: "", birthday:""
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
     _onchangGender: function(e) {
        this.setState({
            gender: e.target.value, 
        });
    },
     _onchangNative: function(e) {
        this.setState({
            native: e.target.value, 
        });
    },
     _onchangBirthday: function(e) {
        this.setState({
            birthday: e.target.value, 
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
                lastname: editingStudent.lastname,
                gender: editingStudent.gender,
                native: editingStudent.native,
                birthday: editingStudent.birthday

            });
        }
    },
    _onclickClose: function(){       
        this.setState({                        
           student_id:"", firstname: "", midname: "", lastname: "", gender: "", native: "", birthday:"",           
           editingStudent: "",                  
        });
    },
    getInitialState: function() {
            return {
            student_id:"", firstname: "", midname: "", lastname: "", gender: "", native: "", birthday:"",           
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
                                <input id="title" value={this.state.student_id} onChange={this._onchangId} ref="student_id" className="form-control" type="text" placeholder="Mã Sinh viên" name="title"/>
                            </div>                       
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Họ</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.firstname} onChange={this._onchangFirstname} ref="firstname" className="form-control" type="text" placeholder="Họ"  name="title"/>
                            </div>
                        </div>                        
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.lastname} onChange={this._onchangLastname} ref="lastname" className="form-control" type="text" placeholder="Tên"  name="title"/>
                            </div>
                        </div>   
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Giới tính</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.gender} onChange={this._onchangGender} ref="gender" className="form-control" type="text" placeholder="Giới tính"  name="title"/>
                            </div>
                        </div>   
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Quê quán</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.native} onChange={this._onchangNative} ref="native" className="form-control" type="text" placeholder="Quê quán" name="title"/>
                            </div>
                        </div>   
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Ngày sinh</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.birthday} onChange={this._onchangBirthday} ref="birthday" className="form-control" type="text" placeholder="Ngày sinh" name="title"/>
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