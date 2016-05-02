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
    _openModal: function(){
        $('#modal1').openModal();
    },
    componentDidMount: function() {
        StudentStore.addEditStudentListener(this._onEdit);
    },
    render: function() {
        var btnAdd = ( <button type="button" onClick={this._onClickAdd} className="btn btn-primary">Lưu</button>);
        var btnUpdate = (<button type="button" onClick={this._onClickUpdate} className="btn btn-primary">Update</button>);

        return ( <div><button type="button" onClick={this._openModal} className="btn btn-primary">OPEN</button> 
  <div id="modal1" className="modal">
    <div className="modal-content">
      <div className="row">
    <form className="col s12">
      <div className="row">
        <div className="input-field col s6">
          <input placeholder="Placeholder" id="first_name" type="text" className="validate"/>
          <label for="first_name">First Name</label>
        </div>
        <div className="input-field col s6">
          <input id="last_name" type="text" className="validate"/>
          <label for="last_name">Last Name</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input disabled value="I am not editable" id="disabled" type="text" className="validate"/>
          <label for="disabled">Disabled</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="password" type="password" className="validate"/>
          <label for="password">Password</label>
        </div>
      </div>
      <div className="row">
        <div className="input-field col s12">
          <input id="email" type="email" className="validate"/>
          <label for="email">Email</label>
        </div>
      </div>
    </form>
  </div>
    </div>
    <div className="modal-footer">
      <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
    </div>
  </div>
         </div> 
        );
    }
});

module.exports = StudentForm;
http://materializecss.com/dialogs.html