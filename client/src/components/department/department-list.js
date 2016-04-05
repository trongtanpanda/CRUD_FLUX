var React = require("react"),
    DepartmentStore = require("../../stores/department-store"),
    DeparmentActions = require("../../actions/department-action.js");
var DepartmentList = React.createClass({

    render: function() {
        var departmentList = this.props.departments.map(function(departments, index) {
           
            return (
                <tr key={index}>
                    <td>{departments.department_id}</td>                    
                    <td>{departments.name}</td>  
                    <td>{departments.dean}</td>  
                    <td>{departments.ministry}</td>                    
                    <td>{departments.phone}</td>  
                    
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