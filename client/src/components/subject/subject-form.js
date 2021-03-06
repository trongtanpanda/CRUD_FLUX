var React = require("react"),    
    SubjectStore = require("../../stores/subject-store"),
    SubjectActions = require("../../actions/subject-action.js");

var SubjectForm = React.createClass({
    
    _onClickAdd: function() {
         var subject = {
            subject_id: this.state.subject_id,
            name: this.state.name,
            short_name: this.state.short_name,
            number: this.state.number
        };

        SubjectActions.create(subject);
        this.setState({
           subject_id:"", name: "", short_name: "", number: ""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onClickUpdate: function() {
        var editingSubject = this.state.editingSubject;        
        var user ={
            _id:editingSubject._id,
            subject_id: this.state.subject_id,
            name: this.state.name,
            short_name: this.state.short_name,
            number: this.state.number
        };
        SubjectActions.update(user);
        this.setState({
            subject_id:"", name: "", short_name: "", number: ""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onchangId: function(e){        
        this.setState({
            subject_id: e.target.value,
        });
    },
    _onchangname: function(e) {
        this.setState({
            name: e.target.value, 
        });
    },
    _onchangshort_name: function(e) {
        this.setState({
            short_name: e.target.value, 
        });
    },
    _onchangnumber: function(e) {
        this.setState({
            number: e.target.value, 
        });
    },
    _onEdit: function() {  
        var editingSubject = SubjectStore.getEditingSubjects();
        this.setState({
            editingSubject: editingSubject,
        });

        if (editingSubject) {
            this.setState({
                subject_id: editingSubject.subject_id,
                name: editingSubject.name,
                short_name: editingSubject.short_name,
                number: editingSubject.number,
            });
        }
    },
    _onclickClose: function(){       
        this.setState({                        
            subject_id: "",
            name: "",
            short_name:"",
            number: "",           
            editingSubject: "",                  
        });
    },
    getInitialState: function() {
            return {
            subject_id: "", first: "", short_name: "", number: "",            
            editingSubject: null,            
        }
    },
    componentDidMount: function() {
        SubjectStore.addEditSubjectListener(this._onEdit);
    },
    render: function() {
        if(this.state.editingSubject){
            $(".input-field label").addClass("active");
        }
        var btnAdd = ( <button type="button" onClick={this._onClickAdd} className="btn btn-primary">Lưu</button>);
        var btnUpdate = (<button type="button" onClick={this._onClickUpdate} className="btn btn-primary">Cập nhật</button>);

        return (
            <div>
            <button type="button" onClick={this._onclickClose} className="btn btn-primary btn-lg pull-right" data-toggle="modal" data-target="#myModal">
              Thêm mới
            </button>  
           <p>&nbsp;</p>              
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" >
                <div className="modal-content" >
                  <div className="modal-header">
                    <button type="button" onClick={this._onclickClose} className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4 className="modal-title" id="myModalLabel">Thêm môn học</h4>
                  </div>
                  <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="row">
                            <div className="input-field col s6">
                              <input id="subject_id" value={this.state.subject_id} onChange={this._onchangId} ref="subject_id" type="text" className="validate"/>
                              <label for="subject_id">Mã môn học</label>
                            </div>
                            <div className="input-field col s6">
                              <input id="name" value={this.state.name} onChange={this._onchangname} ref="name" type="text" className="validate"/>
                              <label for="name">Tên môn học</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s6">
                              <input id="short_name" value={this.state.short_name} onChange={this._onchangshort_name} ref="short_name" type="text" className="validate"/>
                              <label for="short_name">Tên viết tắt</label>
                            </div>
                            <div className="input-field col s6">
                              <input id="number" value={this.state.number} onChange={this._onchangnumber} ref="number" type="text" className="validate"/>
                              <label for="number">Số lượng tín chỉ</label>
                            </div>
                        </div>
                              
                    </form>                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close" onClick={this._onclickClose} className="btn grey" data-dismiss="modal">Đóng</button>&nbsp;
                     {this.state.editingSubject ? btnUpdate : btnAdd}
                  </div>
                </div>
              </div>
            </div>             
            
        </div>
        );
    }
});

module.exports = SubjectForm;