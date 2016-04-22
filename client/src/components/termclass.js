var React = require("react"),
    TermClassActions = require("../actions/termClass-action.js"),
    // CourseActions = require('../actions/course-action'),
    TermClassStore = require("../stores/termClass-store"), 
    // ComboCourse = require("./combb-course"),   
    TermClassForm = require("./termClass/termClass-form"),
    TermClassList = require("./termClass/termClass-list");
    // Message = require("./message.js");



var TermClass = React.createClass({
    _onChange: function() {
        console.log("onchane",TermClassStore.getTermClasss());
        this.setState({
            termClasss: TermClassStore.getTermClasss(),
           
        }); 
      
               
    },
    getInitialState: function() {
        TermClassActions.fetchAddTermClassFromServer();       
        return {
            termClasss: TermClassStore.getTermClasss(),          
           
        }
    },
    componentDidMount: function() {
        TermClassStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       console.log('view',this.state.termClasss);
        return (
            
            <div>
                <h1 className="text-center">Quản lý sinh viên</h1>
                    <div className="col-md-10 col-md-offset-1">                     
                    <TermClassForm />
                     <TermClassList termClasss={this.state.termClasss} />
                </div>

            </div>
            
        );
    }
});

module.exports = TermClass;