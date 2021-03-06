var React = require("react"),
    DepartmentStore = require("../../stores/department-store"),
    DepartmentActions = require("../../actions/department-action.js");
var Confirm = require('react-confirm-bootstrap');
var DepartmentList = React.createClass({
     _onDelete: function() {        
        var deletingDepartment = DepartmentStore.getDeleteDepartment();
        // console.log(editingDepartment);
        this.setState({
            deletingDepartment: deletingDepartment,
        });

        if (deletingDepartment) {
            this.setState({
                name: deletingDepartment.name,
                _id: deletingDepartment._id,
            });
        }
    },
    getInitialState: function() {
            return {
            name: "",            
            deletingDepartment: null, 
            id: null,           
        }
    },
    componentDidMount: function() {
        DepartmentStore.addDeleteDepartmentListener(this._onDelete);
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
                                      
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#myModal" value="Edit" className="btn btn-success" onClick={DepartmentActions.editDepartment.bind(null,department._id)} /></td>
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#deleModal" value="delete" className="btn btn-danger" onClick={DepartmentActions.deleteDepartment.bind(null,department._id)} /></td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>                        
                        {departmentList}
                    </tbody>
                </table>
                   <div className="modal fade" id="deleModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" >
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button"  className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4 className="modal-title" id="myModalLabel">Thêm khoa mới</h4>
                  </div>
                  <div className="modal-body">
                   {this.state.name}
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal">Đóng</button>
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal" onClick={DepartmentActions.destroy.bind(null,this.state._id)}>DELETE</button>

                  </div>
                </div>
              </div>
            </div>
            </div>
        );
    }
});

module.exports = DepartmentList;