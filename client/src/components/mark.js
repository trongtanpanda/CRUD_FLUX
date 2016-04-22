var React = require("react"),
    MarkActions = require("../actions/mark-action.js"),
    // CourseActions = require('../actions/course-action'),
    MarkStore = require("../stores/mark-store"), 
    // ComboCourse = require("./combb-course"),   
    MarkForm = require("./mark/mark-form"),
    MarkList = require("./mark/mark-list");
    // Message = require("./message.js");



var Mark = React.createClass({
    _onChange: function() {
        console.log("onchane",MarkStore.getMarks());
        this.setState({
            marks: MarkStore.getMarks(),
           
        }); 
      
               
    },
    getInitialState: function() {
        MarkActions.fetchAddMarkFromServer();       
        return {
            marks: MarkStore.getMarks(),          
           
        }
    },
    componentDidMount: function() {
        MarkStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Quản lý sinh viên</h1>
                    <div className="col-md-10 col-md-offset-1"> 
                    <MarkForm />                   
                    <MarkList marks={this.state.marks} />


                </div>

            </div>
            
        );
    }
});

module.exports = Mark;