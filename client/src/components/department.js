var React = require("react"),
    DepartmentActions = require("../actions/department-action"),
    //CourseActions = require('../actions/course-action'),
    DepartmentStore = require("../stores/department-store"), 
   // ComboCourse = require("./combb-course"),   
    DepartmentForm = require("./department/department-form"),
    DepartmentList = require("./department/department-list");
    // Message = require("./message");



var Department = React.createClass({

    componentWillMount: function() {
        this.setState({
            departments: DepartmentStore.getDepartments()});
        
    },
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
                <h1 className="text-center">Khoa</h1>
                    <div className="col-md-10 col-md-offset-1">                                                     
                    <DepartmentForm />               
                    <DepartmentList departments={this.state.departments} />
                </div>

            </div>
            
        );
    }
});

module.exports = Department;