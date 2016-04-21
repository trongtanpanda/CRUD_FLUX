var React = require("react"),
    DepartmentActions = require("../actions/department-action.js"),
    // CourseActions = require('../actions/course-action'),
    DepartmentStore = require("../stores/department-store"), 
    // ComboCourse = require("./combb-course"),   
    DepartmentForm = require("./department/department-form"),
    DepartmentList = require("./department/department-list");
    // Message = require("./message.js");



var department = React.createClass({
    _onChange: function() {
        this.setState({
            departments: DepartmentStore.getDepartments(),
           
        }); 
      
               
    },
    getInitialState: function() {        
        DepartmentActions.fetchAddDepartmentFromServer();       
        return {
            departments: DepartmentStore.getDepartments(),          
           
        }
    },
    componentDidMount: function() {
        DepartmentStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Quản lý sinh viên</h1>
                    <div className="col-md-10 col-md-offset-1"> 
                    <DepartmentForm />                   
                    <DepartmentList departments={this.state.departments} />

                </div>

            </div>
            
        );
    }
});

module.exports = department;