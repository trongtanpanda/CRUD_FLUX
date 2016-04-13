var React = require("react"),
    DepartmentStore = require("../../stores/department-store"),
    DeparmentActions = require("../../actions/department-action.js");
var Confirm = require('react-confirm-bootstrap');
var DepartmentList = React.createClass({

  _remove: function(department){
    this.setState({
            deleteDepartment: department,
        });
   
  },
  _delete: function(department){
    DeparmentActions.destroy(department._id);
  },
  getInitialState: function() {
            return {           
            deleteDepartment: "",           
        }
    },
    render: function() {
        var departmentList = this.props.departments.map(function(department, index) {
           
            return (
                <tr key={index}>
                    <td>{department.department_id}</td>                    
                    <td>{department.name}</td>  
                    <td>{department.dean}</td>  
                    <td>{department.ministry}</td>                    
                    <td>{department.phone}</td>  
                    <td>
                      <input type="button" value="Edit" data-toggle="modal" data-target="#myModal" className="btn btn-success" onClick={DeparmentActions.editDepartment.bind(null,department._id)} />&nbsp;
                      <input type="button" value="Remove" data-toggle="modal" data-target="#deleModal" className="btn btn-danger"  onClick={this._remove.bind(null,(department))}/>
                    </td>                    
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>
                        <thead>
                          <tr>
                             <th>Mã khoa</th>
                             <th>Tên Khoa</th>
                             <th>Trưởng Khoa</th>
                             <th>Giáo vụ</th>
                             <th>Điện thoại</th>
                             <th>Action</th>
                          </tr>
                        </thead>
                        {departmentList}
                    </tbody>
                </table> 
                 <div className="modal fade" id="deleModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
                  <div className="modal-dialog" >
                    <div className="modal-content" >
                      <div className="modal-header">
                        <button type="button"  className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                        <h4 className="modal-title" id="myModalLabel">Xóa Khoa</h4>
                      </div>
                      <div className="modal-body">
                       Bạn có muốn xóa khoa "<b>{this.state.deleteDepartment.name}</b>"?
                      </div>
                      <div className="modal-footer">
                        <button type="button" id="close" className="btn btn-default" data-dismiss="modal">Đóng</button>
                         <button type="button"onClick={this._delete(this.state.deleteDepartment)} className="btn btn-primary">OK</button>
                      </div>
                    </div>
                  </div>
                </div>              
            </div>
          
        );
    }
});

module.exports = DepartmentList;