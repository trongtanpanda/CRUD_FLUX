var React = require("react"),
    SubjectActions = require("../actions/subject-action.js"),
    // CourseActions = require('../actions/course-action'),
    SubjectStore = require("../stores/subject-store"), 
    // ComboCourse = require("./combb-course"),   
    SubjectForm = require("./subject/subject-form"),
    SubjectList = require("./subject/subject-list");
    // Message = require("./message.js");



var Subject = React.createClass({
    _onChange: function() {
        console.log("onchane",SubjectStore.getSubjects());
        this.setState({
            subjects: SubjectStore.getSubjects(),
           
        }); 
      
               
    },
    getInitialState: function() {
        SubjectActions.fetchAddSubjectFromServer();       
        return {
            subjects: SubjectStore.getSubjects(),          
           
        }
    },
    componentDidMount: function() {
        SubjectStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Quản lý sinh viên</h1>
                    <div className="col-md-10 col-md-offset-1"> 
                    <SubjectForm />                   
                    <SubjectList subjects={this.state.subjects} />

                </div>

            </div>
            
        );
    }
});

module.exports = Subject;