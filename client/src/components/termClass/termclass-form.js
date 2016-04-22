var React = require("react"),    
    TermClassStore = require("../../stores/termClass-store"),
    TermClassActions = require("../../actions/termClass-action.js");

var TermClassForm = React.createClass({
    
    _onClickAdd: function() {
         var termClass = {
            termClass_id: this.state.termClass_id,
            name: this.state.name,
            number: this.state.number,
            theory: this.state.theory,
            diligence: this.state.diligence,
            practive: this.state.practive,
            self_taught: this.state.self_taught,
            perceive: this.state.perceive,
            last_test: this.state.last_test
        };
        console.log(termClass);
        TermClassActions.create(termClass);
        this.setState({
           termClass_id:"", name: "", number: "", theory: "",diligence:"",practive:"",self_taught:"",perceive:"",last_test:""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onClickUpdate: function() {
        var editingTermClass = this.state.editingTermClass;        
        var user ={
            _id:editingTermClass._id,
            termClass_id: this.state.termClass_id,
            name: this.state.name,
            number: this.state.number,
            theory: this.state.theory,
            diligence: this.state.diligence,
            practive: this.state.practive,
            self_taught: this.state.self_taught,
            perceive: this.state.perceive,
            last_test: this.state.last_test
        };
        TermClassActions.update(user);
        this.setState({
            termClass_id:"", name: "", number: "", theory: "",diligence:"",practive:"",self_taught:"",perceive:"",last_test:""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onchangId: function(e){        
        this.setState({
            termClass_id: e.target.value,
        });
    },
    _onchangname: function(e) {
        this.setState({
            name: e.target.value, 
        });
    },
    _onchangnumber: function(e) {
        this.setState({
            number: e.target.value, 
        });
    },
    _onchangtheory: function(e) {
        this.setState({
            theory: e.target.value, 
        });
    },
     _onchangdiligence: function(e) {
        this.setState({
            diligence: e.target.value, 
        });
    },
     _onchangpractive: function(e) {
        this.setState({
            practive: e.target.value, 
        });
    },
     _onchangself_taught: function(e) {
        this.setState({
            self_taught: e.target.value, 
        });
    },
     _onchangperceive: function(e) {
        this.setState({
            perceive: e.target.value, 
        });
    },
     _onchanglast_test: function(e) {
        this.setState({
            last_test: e.target.value, 
        });
    },
    
    _onEdit: function() {  
        var editingTermClass = TermClassStore.getEditingTermClasss();
        this.setState({
            editingTermClass: editingTermClass,
        });
        console.log(editingTermClass);
        if (editingTermClass) {
            this.setState({
                termClass_id: editingTermClass.termClass_id,
                name: editingTermClass.name,
                number: editingTermClass.number,
                theory: editingTermClass.theory,
                diligence: editingTermClass.diligence,
                practive: editingTermClass.practive,
                self_taught: editingTermClass.self_taught,
                perceive: editingTermClass.perceive,
                last_test: editingTermClass.last_test,
            });
        }
    },
    _onclickClose: function(){       
        this.setState({                        
            termClass_id:"", name: "", number: "", theory: "",diligence:"",practive:"",self_taught:"",perceive:"",last_test:"",           
            editingTermClass: "",                  
        });
    },
    getInitialState: function() {
            return {
            termClass_id:"", name: "", number: "", theory: "",diligence:"",practive:"",self_taught:"",perceive:"",last_test:"",            
            editingTermClass: null,            
        }
    },
    componentDidMount: function() {
        TermClassStore.addEditTermClassListener(this._onEdit);
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
                                <input id="title" value={this.state.termClass_id} onChange={this._onchangId} ref="termClass_id" className="form-control" type="text" placeholder="Mã khoa" ref="title" name="title"/>
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
                                <input id="title" value={this.state.number} onChange={this._onchangnumber} ref="number" className="form-control" type="text" placeholder="Trưởng khoa" ref="title" name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.theory} onChange={this._onchangtheory} ref="theory" className="form-control" type="text" placeholder="Giáo vụ" ref="title" name="title"/>
                            </div>
                        </div>  
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.diligence} onChange={this._onchangdiligence} ref="diligence" className="form-control" type="text" placeholder="Giáo vụ" ref="title" name="title"/>
                            </div>
                        </div>  
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.practive} onChange={this._onchangpractive} ref="practive" className="form-control" type="text" placeholder="Giáo vụ" ref="title" name="title"/>
                            </div>
                        </div>  
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.self_taught} onChange={this._onchangself_taught} ref="self_taught" className="form-control" type="text" placeholder="Giáo vụ" ref="title" name="title"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.perceive} onChange={this._onchangperceive} ref="perceive" className="form-control" type="text" placeholder="Giáo vụ" ref="title" name="title"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.last_test} onChange={this._onchanglast_test} ref="last_test" className="form-control" type="text" placeholder="Giáo vụ" ref="title" name="title"/>
                            </div>
                        </div>    
                                                
                    </form>                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close" onClick={this._onclickClose} className="btn btn-default" data-dismiss="modal">Đóng</button>
                     {this.state.editingtermClass ? btnUpdate : btnAdd}
                  </div>
                </div>
              </div>
            </div>             
            
        </div>
        );
    }
});

module.exports = TermClassForm;