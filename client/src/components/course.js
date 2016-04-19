var React = require("react"),
    CourseActions = require("../actions/course-action.js"),   
    CourseStore = require("../stores/course-store"),      
     CourseForm = require("./course/course-form"),
    CourseList = require("./course/course-list");
    // Message = require("./message.js");



var Course = React.createClass({
    _onChange: function() {
        // console.log("onchane",CourseStore.getCourse());
        this.setState({
            courses: CourseStore.getCourse(),           
        });  
    },
    getInitialState: function() {

        CourseActions.fetchAddCourseFromServer();
        // console.log("this is",CourseStore.getCourse());       
        return {
            courses: CourseStore.getCourse(),          
           
        }
    },
    componentDidMount: function() {
        CourseStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Quản lý sinh viên</h1>
                    <div className="col-md-10 col-md-offset-1"> 
                    <CourseForm />               
                    <CourseList courses={this.state.courses} />

                </div>

            </div>
            
        );
    }
});

module.exports = Course;