var React = require("react"),
    MarkActions = require("../actions/mark-action"),
    MarkStore = require("../stores/mark-store"),   
    MarkList = require("./mark/mark-list"),
    StudentAction = require("../actions/student-action"),
    TermClassAction = require("../actions/term-class");
    // Message = require("./message");



var Mark = React.createClass({
     componentWillMount: function() {
        this.setState({
            marks: MarkStore.getMarks()
            
        }); 
        
    },
    _onChange: function() {

        this.setState({
            marks: MarkStore.getMarks(),
            
        }); 
       
               
    },
    getInitialState: function() {
        MarkActions.fetchAddMarkFromServer();
        StudentAction.fetchAddStudentFromServer();
        TermClassAction.fetchAddTerm_classFromServer();
        return {
            marks: MarkStore.getMarks(),           
        }
         this.setState({
            marks: MarkStore.getMarks(),
            
        });
    },
    componentDidMount: function() {
        MarkStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Quản lý điểm</h1>
                    <div className="col-md-10 col-md-offset-1">
                        <MarkList marks={this.state.marks} />
                </div>

            </div>
            
        );
    }
});

module.exports = Mark;