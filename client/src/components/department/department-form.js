var React = require("react"), 
    DepartmentStore = require('../../stores/department-store'),
    DepartmentActions = require("../../actions/department-action");

var DepartmentForm = React.createClass({
    
   _onchangId: function(e){             
        this.setState({
            id: e.target.value,
        });
    },
    _onchangName: function(e){        
        this.setState({
            name: e.target.value,
        });
    },
    _onchangDean: function(e){        
        this.setState({
            dean: e.target.value,
        });
    },
    _onchangMinistry: function(e){        
        this.setState({
            ministry: e.target.value,
        });
    },
    _onchangPhone: function(e){        
        this.setState({
            phone: e.target.value,
        });
    },
     getInitialState: function() {
            return {
            id: "",
            name: "", 
            dean: "", 
            ministry: "", 
            phone: "",             
                       
        }
    },
     _onClickAdd: function() {
         var department = {
            id: this.state.id, 
            name: this.state.name,
            dean: this.state.dean,
            ministry: this.state.ministry,
            phone: this.state.phone
        };

        DepartmentActions.create(department);
        this.setState({
            id: "",
            name: "",
            dean:"",
            ministry: "",
            phone: "",                       
        });
       $("#close").click();
    },
     _onClickUpdate: function() {
        var editingDepartment = this.state.editingDepartment;
         var department = {
            _id: editingDepartment._id,
            id: this.state.id, 
            name: this.state.name,
            dean: this.state.dean,
            ministry: this.state.ministry,
            phone: this.state.phone
        };

        DepartmentActions.update(department);
        this.setState({
            id: "",
            name: "",
            dean:"",
            ministry: "",
            phone: "",                       
        });
       $("#close").click();
    },
    _onclickClose: function(){       
        this.setState({                        
            id: "",
            name: "",
            dean:"",
            ministry: "",
            phone: "", 
            editingDepartment: "",       
        });
    },

    _onEdit: function() {        
        var editingDepartment = DepartmentStore.getEditingDepartment();
        this.setState({
            editingDepartment: editingDepartment,
        });

        if (editingDepartment) {
            this.setState({
              id: editingDepartment.department_id, 
            name: editingDepartment.name,
            dean: editingDepartment.dean,
            ministry: editingDepartment.ministry,
            phone: editingDepartment.phone
            });
        }
    },
    getInitialState: function() {
            return {
            name: "",            
            editingDepartment: null,            
        }
    },
    
    componentDidMount: function() {
        DepartmentStore.addEditDepartmentListener(this._onEdit);
    },
    render: function() {
   
        var btnAdd = ( <button type="button" onClick={this._onClickAdd} className="btn btn-primary">Lưu</button>);
        var btnUpdate = (<button type="button" onClick={this._onClickUpdate} className="btn btn-primary">Update</button>);

        return (
             <div>
            <button type="button" onClick={this._onclickClose} className="btn btn-primary btn-lg pull-right" data-toggle="modal" data-target="#myModal">
              Thêm mới
            </button>                    
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" onClose={this._onclickClose} aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" onClose={this._onclickClose}>
                <div className="modal-content" onClose={this._onclickClose}>
                  <div className="modal-header">
                    <button type="button" onClick={this._onclickClose} className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4 className="modal-title" id="myModalLabel">Thêm khoa mới</h4>
                  </div>
                  <div className="modal-body">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Mã khoa</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.id} onChange={this._onchangId} ref="id" className="form-control" type="text" placeholder="Mã khoa" ref="title" name="title"/>
                            </div>                       
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên khoa</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.name} onChange={this._onchangName} ref="name" className="form-control" type="text" placeholder="Tên khoa" ref="title" name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Trưởng khoa</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.dean} onChange={this._onchangDean} ref="dean" className="form-control" type="text" placeholder="Trưởng khoa" ref="title" name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Giáo vụ</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.ministry} onChange={this._onchangMinistry} ref="ministry" className="form-control" type="text" placeholder="Giáo vụ" ref="title" name="title"/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Điện thoại</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.phone} onChange={this._onchangPhone} ref="phone" className="form-control" type="text" placeholder="Điện thoại" ref="title" name="title"/>
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

module.exports = DepartmentForm;