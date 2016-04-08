var React = require("react"),
    SubjectActions = require("../actions/subject-action.js"),
    //CourseActions = require('../actions/course-action'),
    SubjectStore = require("../stores/subject-store"), 
    //ComboCourse = require("./combb-course"),   
    
    SubjectList = require("./subject/subject-list");
    // Message = require("./message");



var Subject = React.createClass({
    _onChange: function() {

        this.setState({
            subjects: SubjectStore.getSubjects()
            //message: UserStore.getMessage(),
            // courses: UserStore.getCourses(),
        }); 
        
               
    },
    getInitialState: function() {
        SubjectActions.fetchAddSubjectFromServer();
        //CourseActions.getListCourse();      

        return {
            subjects: SubjectStore.getSubjects(),
            // message: SubjectStore.getMessage(),
            // courses: SubjectStore.getCourses(),
        }
        
    },
    componentWillMount: function() {
        this.setState({
            subjects: SubjectStore.getSubjects(),          
        }); 
        
    },
    componentDidMount: function() {
        SubjectStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Quản lý môn học</h1>
                <div className="col-md-10 col-md-offset-1">                                                     
                                   
                    <SubjectList subjects={this.state.subjects} />
                </div>

            </div>
            
        );
    }
});

module.exports = Subject;