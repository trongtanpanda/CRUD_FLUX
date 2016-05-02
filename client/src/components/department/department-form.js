var React = require("react"),    
    DeparmentStore = require("../../stores/department-store"),
    DeparmentActions = require("../../actions/department-action.js");

var StudentForm = React.createClass({
    
    _onClickAdd: function() {

         var student = {
            department_id: this.state.department_id,
            name: this.state.name,
            dean: this.state.dean,
            ministry: this.state.ministry,
            phone: this.state.phone
        };
        DeparmentActions.create(student);
        this.setState({
           department_id:"", name: "", dean: "", ministry: "", phone:""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onClickUpdate: function() {
        var editingDepartment = this.state.editingDepartment;        
        var user ={
            _id:editingDepartment._id,
            department_id: this.state.department_id,
            name: this.state.name,
            dean: this.state.dean,
            ministry: this.state.ministry,
            phone: this.state.phone
        };
        DeparmentActions.update(user);
        this.setState({
            department_id:"", name: "", dean: "", ministry: "", phone: ""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onchangId: function(e){        
        this.setState({
            department_id: e.target.value,
        });
    },
    _onchangname: function(e) {
        this.setState({
            name: e.target.value, 
        });
    },
    _onchangdean: function(e) {
        this.setState({
            dean: e.target.value, 
        });
    },
    _onchangministry: function(e) {
        this.setState({
            ministry: e.target.value, 
        });
    },
    _onchangphone: function(e) {
        this.setState({
            phone: e.target.value, 
        });
    },
    _onEdit: function() {  
        var editingDepartment = DeparmentStore.geteditingDepartments();
        this.setState({
            editingDepartment: editingDepartment,
        });

        if (editingDepartment) {
            this.setState({
                department_id: editingDepartment.department_id,
                name: editingDepartment.name,
                dean: editingDepartment.dean,
                ministry: editingDepartment.ministry,
                phone: editingDepartment.phone,
            });
        }
    },
    _onclickClose: function(){       
        this.setState({                        
            department_id: "",
            name: "",
            dean:"",
            ministry: "",  
            phone: "",         
            editingDepartment: "",                  
        });
    },
    getInitialState: function() {
            return {
            department_id: "", first: "", dean: "", ministry: "",phone: "",            
            editingDepartment: null,            
        }
    },
    componentDidMount: function() {
        DeparmentStore.addEditStudentListener(this._onEdit);
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
                    <h4 className="modal-title" id="myModalLabel">Thêm khoa mới</h4>
                  </div>
                  <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Mã khoa</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.department_id} onChange={this._onchangId} ref="department_id" className="form-control" type="text" placeholder="Mã khoa" name="title"/>
                            </div>                       
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên khoa</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.name} onChange={this._onchangname} ref="name" className="form-control" type="text" placeholder="Tên khoa"  name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Trưởng khoa</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.dean} onChange={this._onchangdean} ref="dean" className="form-control" type="text" placeholder="Trưởng khoa" name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Giáo vụ</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.ministry} onChange={this._onchangministry} ref="ministry" className="form-control" type="text" placeholder="Giáo vụ"  name="title"/>
                            </div>
                        </div>   
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Điện thoại</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.phone} onChange={this._onchangphone} ref="phone" className="form-control" type="text" placeholder="Điện thoại" name="title"/>
                            </div>
                        </div>                        
                    </form>                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close" onClick={this._onclickClose} className="btn btn-default" data-dismiss="modal">Đóng</button>
                     {this.state.editingDepartment ? btnUpdate : btnAdd}
                  </div>
                </div>
              </div>
            </div>             
            
        </div>
        );
    }
});

module.exports = StudentForm;