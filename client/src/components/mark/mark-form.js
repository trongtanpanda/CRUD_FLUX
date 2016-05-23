var React = require("react"),    
    MarkStore = require("../../stores/mark-store"),
    MarkActions = require("../../actions/mark-action.js");

var MarkForm = React.createClass({
    
    _onClickAdd: function() {
         var mark = {
            student: this.state.student,
            termClass: this.state.termClass,
            cc: this.state.cc,
            gk: this.state.gk,
            tbkt: this.state.tbkt,
            t1: this.state.t1,
            tkml1: this.state.tkml1,
            t2: this.state.t2,
            tkml2: this.state.tkml2,
            t3: this.state.t3,
            by_text: this.state.by_text,
            by_cc: this.state.by_cc
        };
        MarkActions.create(mark);
        this.setState({
           student:"", termClass: "", cc: "", gk: "",tbkt:"",t1:"",tkml1:"",t2:"",tkml2:"",t3:"",by_text:"",by_number:""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onClickUpdate: function() {
        var editingMark = this.state.editingMark;        
        var user ={
            _id: editingMark._id,
            student: this.state.student,
            termClass: this.state.termClass,
            cc: this.state.cc,
            gk: this.state.gk,
            tbkt: this.state.tbkt,
            t1: this.state.t1,
            tkml1: this.state.tkml1,
            t2: this.state.t2,
            tkml2: this.state.tkml2,
            t3: this.state.t3,
            by_text: this.state.by_text,
            by_cc: this.state.by_cc
        };
        MarkActions.update(user);
        this.setState({
            student:"", termClass: "", cc: "", gk: "",tbkt:"",t1:"",tkml1:"",t2:"",tkml2:"",t3:"",by_text:"",by_number:""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onchangId: function(e){        
        this.setState({
            student: e.target.value,
        });
    },
    _onchangtermClass: function(e) {
        this.setState({
            termClass: e.target.value, 
        });
    },
    _onchangcc: function(e) {
        this.setState({
            cc: e.target.value, 
        });
    },
    _onchanggk: function(e) {
        this.setState({
            gk: e.target.value, 
        });
    },
     _onchangtbkt: function(e) {
        this.setState({
            tbkt: e.target.value, 
        });
    },
     _onchangt1: function(e) {
        this.setState({
            t1: e.target.value, 
        });
    },
     _onchangtkml1: function(e) {
        this.setState({
            tkml1: e.target.value, 
        });
    },
     _onchangt2: function(e) {
        this.setState({
            t2: e.target.value, 
        });
    },
     _onchangtkml2: function(e) {
        this.setState({
            tkml2: e.target.value, 
        });
    },
     _onchangt3: function(e) {
        this.setState({
            t3: e.target.value, 
        });
    },
     _onchangby_text: function(e) {
        this.setState({
            by_text: e.target.value, 
        });
    },
     _onchangby_number: function(e) {
        this.setState({
            by_number: e.target.value, 
        });
    },

    
    _onEdit: function() {  
        var editingMark = MarkStore.getEditingMarks();
        this.setState({
            editingMark: editingMark,
        });
        if (editingMark) {
            this.setState({
                student: editingMark.student,
                termClass: editingMark.termClass,
                cc: editingMark.cc,
                gk: editingMark.gk,
                tbkt: editingMark.tbkt,
                t1: editingMark.t1,
                tkml1: editingMark.tkml1,
                t2: editingMark.t2,
                tkml2: editingMark.tkml2,
                t3: editingMark.t3,
                by_text: editingMark.by_text,
                by_number: editingMark.by_number
            });
        }
    },
    _onclickClose: function(){       
        this.setState({                        
            student:"", termClass: "", cc: "", gk: "",tbkt:"",t1:"",tkml1:"",t2:"",tkml2:"",t3:"",by_text:"",by_number:"",           
            editingMark: "",                  
        });
        $(".input-field label").removeClass("active");
    },
    getInitialState: function() {
            return {
            student:"", termClass: "", cc: "", gk: "",tbkt:"",t1:"",tkml1:"",t2:"",tkml2:"",t3:"",by_text:"",by_number:"",         
            editingMark: null,            
        }
    },
    componentDidMount: function() {
        MarkStore.addEditMarkListener(this._onEdit);
    },
    render: function() {
        if(this.state.editingMark){
            $(".input-field label").addClass("active");
        }
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
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="student" value={this.state.student._id} onChange={this._onchangId} ref="student" className="form-control" type="text"  />
                            <label for="student">Sinh viên</label>
                            </div>                       
                            <div className="input-field col s6">
                                <input id="termClass" value={this.state.termClass._id} onChange={this._onchangtermClass} ref="termClass" className="form-control" type="text" />
                           <label for="termClass">Lớp học phần</label>
                            </div>
                        </div>  
                          <div className="row">
                            <div className="input-field col s6">
                                <input id="cc" value={this.state.cc} onChange={this._onchangcc} ref="cc" className="form-control" type="text"  />
                           <label for="cc">Chuyên cần</label>
                            </div>
                        
                            <div className="input-field col s6">
                                <input id="gk" value={this.state.gk} onChange={this._onchanggk} ref="gk" className="form-control" type="text"   />
                            <label for="gk">Giữa kỳ</label>
                            </div>
                        </div>  
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="tbkt" value={this.state.tbkt} onChange={this._onchangtbkt} ref="tbkt" className="form-control" type="text" />
                            <label for="tbkt">Kiểm tra</label>
                            </div>
                        
                            <div className="input-field col s6">
                                <input id="t1" value={this.state.t1} onChange={this._onchangt1} ref="t1" className="form-control" type="text"  />
                            <label for="t1">Thi lần 1</label>
                            </div>
                        </div>  
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="tkml1" value={this.state.tkml1} onChange={this._onchangtkml1} ref="tkml1" className="form-control" type="text"  />
                            <label for="tkml1">Lần 1</label>
                            </div>
                       
                            <div className="input-field col s6">
                                <input id="t2" value={this.state.t2} onChange={this._onchangt2} ref="t2" className="form-control" type="text"  />
                            <label for="t2">Thi lần 2</label>
                            </div>
                        </div>  
                         <div className="row">
                            <div className="input-field col s6">
                                <input id="tkml2" value={this.state.tkml2} onChange={this._onchangtkml2} ref="tkml2" className="form-control" type="text"   />
                            <label for="tkml2">Lần 2</label>
                            </div>
                        
                            <div className="input-field col s6">
                                <input id="t3" value={this.state.t3} onChange={this._onchangt3} ref="t3" className="form-control" type="text" />
                            <label for="t3">Thi lần 3</label>
                            </div>
                        </div>    
                        <div className="row">
                            <div className="input-field col s6">
                                <input id="by_text" value={this.state.by_text} onChange={this._onchangby_text} ref="by_text" className="form-control" type="text"   />
                            <label for="by_text">Chữ</label>
                            </div>
                       
                            <div className="input-field col s6">
                                <input id="by_number" value={this.state.by_number} onChange={this._onchangby_number} ref="by_number" className="form-control" type="text" />
                            <label for="by_number">Số</label>
                            </div>
                        </div>                            
                    </form>                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close" onClick={this._onclickClose} className="btn btn-default" data-dismiss="modal">Đóng</button>
                     {this.state.editingMark ? btnUpdate : btnAdd}
                  </div>
                </div>
              </div>
            </div>             
            
        </div>
        );
    }
});

module.exports = MarkForm;