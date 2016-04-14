var React = require("react"),
    DepartmentStore = require("../../stores/department-store"),
    DeparmentActions = require("../../actions/department-action.js");
var Confirm = require('react-confirm-bootstrap');
var DepartmentList = React.createClass({
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
                      <input type="button" value="Delete" data-toggle="modal" data-target="#myModal" className="btn btn-danger"  onClick={DeparmentActions.destroy.bind(null,department._id)}/>
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
            </div>
          
        );
    }
});

module.exports = DepartmentList;