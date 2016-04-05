var React = require("react"),
    CourseActions = require("../actions/course-action"),
    //CourseActions = require('../actions/course-action'),
    CourseStore = require("../stores/course-store"), 
    //ComboCourse = require("./combb-course"),   
    //CourseForm = require("./course/course-form"),
    CourseList = require("./course/course-list");
    // Message = require("./message");



var Course = React.createClass({

    componentWillMount: function() {
        this.setState({
            courses: CourseStore.getCourses(),
            
        });
    },
    _onChange: function() {

        this.setState({
            courses: CourseStore.getCourses(),
            
        });        
               
    },
    getInitialState: function() {
        CourseActions.fetchAddCourseFromServer();
        return {
            courses: CourseStore.getCourses(),
            
        }
    },
    componentDidMount: function() {
        CourseStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Khóa học</h1>
                <div className="col-md-10 col-md-offset-1">
                    <CourseList courses={this.state.courses} />
                </div>

            </div>
            
        );
    }
});

module.exports = Course;