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
        var btnAdd = ( <button type="button" onClick={this._onClickAdd} className="btn btn-primary">Lưu</button>);
        var btnUpdate = (<button type="button" onClick={this._onClickUpdate} className="btn btn-primary">Update</button>);

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
                    <h4 className="modal-title" id="myModalLabel">Thêm Sinh Viên mới</h4>
                  </div>
                  <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Mã Sinh viên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.subject_id} onChange={this._onchangId} ref="subject_id" className="form-control" type="text" placeholder="Mã khoa" ref="title" name="title"/>
                            </div>                       
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Họ</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.name} onChange={this._onchangname} ref="name" className="form-control" type="text" placeholder="Tên khoa" ref="title" name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên Đệm</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.short_name} onChange={this._onchangshort_name} ref="short_name" className="form-control" type="text" placeholder="Trưởng khoa" ref="title" name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.number} onChange={this._onchangnumber} ref="number" className="form-control" type="text" placeholder="Giáo vụ" ref="title" name="title"/>
                            </div>
                        </div>                      
                    </form>                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close" onClick={this._onclickClose} className="btn btn-default" data-dismiss="modal">Đóng</button>
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