var React = require("react"),
    Term_ClassActions = require("../actions/term-class"),    
    Term_ClassStore = require("../stores/termclass-store"),     
    Term_ClassList = require("./term_class/term-class-list");
    // Message = require("./message");



var Term_Class = React.createClass({

    componentWillMount: function() {
          this.setState({
            termClasss: Term_ClassStore.getTermClass()
           
        }); 
        
    },
    _onChange: function() {

        this.setState({
            termClasss: Term_ClassStore.getTermClass(),
           
        }); 
       
               
    },
    getInitialState: function() {
        Term_ClassActions.fetchAddTerm_classFromServer();
       
        return {
            termClasss: Term_ClassStore.getTermClass(),
           
        }
        this.setState({
            termClasss: Term_ClassStore.getTermClass()
           
        });
    },
    componentDidMount: function() {
        Term_ClassStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Quản lý Lớp học phần</h1>
                    <div className="col-md-10 col-md-offset-1">                                 
                        <Term_ClassList termClass={this.state.termClasss} />
                </div>

            </div>
            
        );
    }
});

module.exports = Term_Class;