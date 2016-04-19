var React = require("react"),
    StudentActions = require("../actions/student-action.js"),
    // CourseActions = require('../actions/course-action'),
    StudentStore = require("../stores/student-store"), 
    // ComboCourse = require("./combb-course"),   
    StudentForm = require("./student/student-form"),
    StudentList = require("./student/student-list");
    // Message = require("./message.js");



var Student = React.createClass({
    _onChange: function() {
        console.log("onchane",StudentStore.getStudents());
        this.setState({
            students: StudentStore.getStudents(),
           
        }); 
      
               
    },
    getInitialState: function() {
        StudentActions.fetchAddStudentFromServer();       
        return {
            students: StudentStore.getStudents(),          
           
        }
    },
    componentDidMount: function() {
        StudentStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Quản lý sinh viên</h1>
                    <div className="col-md-10 col-md-offset-1"> 
                    <StudentForm />                   
                    <StudentList students={this.state.students} />

                </div>

            </div>
            
        );
    }
});

module.exports = Student;