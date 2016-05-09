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
            editingTermClass: null,                  
        });
        $(".input-field label").removeClass("active");
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
         if(this.state.editingTermClass){
            $(".input-field label").addClass("active");
        }
        var btnAdd = ( <button type="button" onClick={this._onClickAdd} className="btn btn-primary">Lưu</button>);
        var btnUpdate = (<button type="button" onClick={this._onClickUpdate} className="btn btn-primary">Update</button>);

        return (
            <div>
                <div className="button-main" >
                    <button type="button" onClick={this._onclickClose} className="btn btn-primary btn-lg pull-right btn-kind-one light-blue accent-4" data-toggle="modal" data-target="#myModal">
                      Thêm mới
                    </button>  
                </div>             
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
                                        <input id="termClass_id" value={this.state.termClass_id} onChange={this._onchangId} ref="termClass_id" className="form-control" type="text"  ref="title" name="title"/>
                                    <label for="termClass_id">Mã lớp học phần</label>
                                </div>
                            
                                <div className="input-field col s6">
                                    <input id="name" value={this.state.name} onChange={this._onchangname} ref="name" className="form-control" type="text"   name="name"/>
                                    <label for="name">Tên lớp học phần</label>
                                </div>
                            </div>  
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="number" value={this.state.number} onChange={this._onchangnumber} ref="number" className="form-control" type="text"   name="number"/>
                                    <label for="number">Số tín chỉ</label>
                                </div>
                           
                                <div className="input-field col s6">
                                    <input id="theory" value={this.state.theory} onChange={this._onchangtheory} ref="theory" className="form-control" type="text"   name="theory"/>
                                   <label for="theory">Hệ số lý thuyết</label>
                                </div>
                            </div>  
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="diligence" value={this.state.diligence} onChange={this._onchangdiligence} ref="diligence" className="form-control" type="text"   name="diligence"/>
                                   <label for="diligence">Hệ số chuên cần</label>
                                </div>
                           
                                <div className="input-field col s6">
                                    <input id="practive" value={this.state.practive} onChange={this._onchangpractive} ref="practive" className="form-control" type="text"   name="practive"/>
                                    <label for="practive">Hệ số thực hành</label>
                                </div>
                            </div>   
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="self_taught" value={this.state.self_taught} onChange={this._onchangself_taught} ref="self_taught" className="form-control" type="text" name="self_taught"/>
                                    <label for="self_taught">Hệ số kiểm tra</label>
                                </div>
                           
                                <div className="input-field col s6">
                                    <input id="perceive" value={this.state.perceive} onChange={this._onchangperceive} ref="perceive" className="form-control" type="text"  name="perceive"/>
                                    <label for="perceive">Hệ số nhận thức</label>
                                </div>
                            </div>  
                            <div className="row">
                                <div className="input-field col s6">
                                    <input id="last_test" value={this.state.last_test} onChange={this._onchanglast_test} ref="last_test" className="form-control" type="text"  name="last_test"/>
                                    <label for="last_test">Hệ số cuối kỳ</label>
                                </div>
                            </div>      
                                                    
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" id="close" onClick={this._onclickClose} className="btn btn-kind-one grey" data-dismiss="modal">Đóng</button>
                         {this.state.editingTermClass ? btnUpdate : btnAdd}
                      </div>
                    </div>
                  </div>
                </div>             
            
            </div>
        );
    }
});

module.exports = TermClassForm;