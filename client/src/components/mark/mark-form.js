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
        console.log(mark);
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
        console.log(editingMark);
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
                                <input id="title" value={this.state.student} onChange={this._onchangId} ref="student" className="form-control" type="text" placeholder="Mã khoa" ref="title" termClass="title"/>
                            </div>                       
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Họ</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.termClass} onChange={this._onchangtermClass} ref="termClass" className="form-control" type="text" placeholder="Tên khoa" ref="title" termClass="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên Đệm</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.cc} onChange={this._onchangcc} ref="cc" className="form-control" type="text" placeholder="Trưởng khoa" ref="title" termClass="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.gk} onChange={this._onchanggk} ref="gk" className="form-control" type="text" placeholder="Giáo vụ" ref="title" termClass="title"/>
                            </div>
                        </div>  
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.tbkt} onChange={this._onchangtbkt} ref="tbkt" className="form-control" type="text" placeholder="Giáo vụ" ref="title" termClass="title"/>
                            </div>
                        </div>  
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.t1} onChange={this._onchangt1} ref="t1" className="form-control" type="text" placeholder="Giáo vụ" ref="title" termClass="title"/>
                            </div>
                        </div>  
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.tkml1} onChange={this._onchangtkml1} ref="tkml1" className="form-control" type="text" placeholder="Giáo vụ" ref="title" termClass="title"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.t2} onChange={this._onchangt2} ref="t2" className="form-control" type="text" placeholder="Giáo vụ" ref="title" termClass="title"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.tkml2} onChange={this._onchangtkml2} ref="tkml2" className="form-control" type="text" placeholder="Giáo vụ" ref="title" termClass="title"/>
                            </div>
                        </div>    
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.t3} onChange={this._onchangt3} ref="t3" className="form-control" type="text" placeholder="Giáo vụ" ref="title" termClass="title"/>
                            </div>
                        </div>  
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.by_text} onChange={this._onchangby_text} ref="by_text" className="form-control" type="text" placeholder="Giáo vụ" ref="title" termClass="title"/>
                            </div>
                        </div>  
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.by_number} onChange={this._onchangby_number} ref="by_number" className="form-control" type="text" placeholder="Giáo vụ" ref="title" termClass="title"/>
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