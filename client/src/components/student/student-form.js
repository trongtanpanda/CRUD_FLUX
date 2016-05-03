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
         $('#myModal').modal('hide');
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
        $('#myModal').modal('hide');
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
        if(this.state.editingStudent){
            $(".input-field label").addClass("active");
        }
        var btnAdd = ( <button type="button" onClick={this._onClickAdd} className="btn btn-primary">Lưu</button>);
        var btnUpdate = (<button type="button" onClick={this._onClickUpdate} className="btn btn-primary">Update</button>);

        return (
        <div>
            <div className="button" >
            <button type="button" onClick={StudentForm._onclickClose} className="btn btn-primary btn-lg pull-right btn-kind-one light-blue accent-4" data-toggle="modal" data-target="#myModal">
              Thêm mới
            </button> 
            &nbsp;
            <button type="button"  className="btn btn-success btn-lg pull-right btn-kind-one light-blue accent-4" data-toggle="modal" data-target="#ecelModal">
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
                        <div className="row">
                            <div className="input-field col s6">
                              <input id="student_id" value={this.state.student_id} onChange={this._onchangId} ref="student_id" type="text" className="validate"/>
                              <label for="student_id">Mã sinh viên</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                              <input id="firstname" value={this.state.firstname} onChange={this._onchangFirstname} ref="firstname" type="text" className="validate"/>
                              <label for="firstname">Họ</label>
                            </div>
                        
                            <div className="input-field col s6">
                              <input id="lastname" value={this.state.lastname} onChange={this._onchangLastname} ref="lastname" type="text" className="validate"/>
                              <label for="lastname">Tên</label>
                            </div>
                        </div>                  
                        <div className="row">
                            <div className="input-field col s6">
                              <input id="gender" value={this.state.gender} onChange={this._onchangGender} ref="gender" type="text" className="validate"/>
                              <label for="gender">Giới tính</label>
                            </div>
                             <div className="input-field col s6">
                              <input id="birthday" value={this.state.birthday} onChange={this._onchangBirthday} ref="birthday" type="text" className="validate"/>
                              <label for="birthday">Ngày sinh</label>
                            </div>
                        </div>   
                        <div className="row">
                            <div className="input-field col s12">
                              <input id="native" value={this.state.native} onChange={this._onchangNative} ref="native" type="text" className="validate"/>
                              <label for="native">Quê quán</label>
                            </div>
                        </div>     
                                    
                    </form>                    
                  </div>
                  <div className="modal-footer">                      
                    <button type="button" id="close" onClick={this._onclickClose} className="btn btn-kind-one grey" data-dismiss="modal">Đóng</button>
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