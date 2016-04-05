var React = require("react"),
    StudentActions = require("../actions/student-action.js"),
    CourseActions = require('../actions/course-action'),
    UserStore = require("../stores/user-store"), 
    ComboCourse = require("./combb-course"),   
    StudentForm = require("./student/student-form"),
    StudentList = require("./student/student-list"),
    Message = require("./message.js");



var Student = React.createClass({
    _onChange: function() {

        this.setState({
            students: UserStore.getStudents(),
            message:UserStore.getMessage(),
            courses: UserStore.getCourses(),
        }); 
        if(this.state.message){
            $.bootstrapGrowl(this.state.message.message, { type: this.state.message.type, delay: 5000 } );
        }
               
    },
    getInitialState: function() {
        StudentActions.fetchAddStudentFromServer();
        CourseActions.getListCourse();
        return {
            students: UserStore.getStudents(),
            message:UserStore.getMessage(),
            courses: UserStore.getCourses(),
        }
    },
    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Quản lý sinh viên</h1>
                    <div className="col-md-10 col-md-offset-1">                                                       
                    <StudentForm listCourse={this.state.courses}/>                 
                    <StudentList students={this.state.students} />
                </div>

            </div>
            
        );
    }
});

module.exports = Student;