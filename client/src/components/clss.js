var React = require("react"),
    ClssActions = require("../actions/clss-action.js"),   
    ClssStore = require("../stores/clss-store"),      
     ClssForm = require("./clss/clss-form"),
    ClssList = require("./clss/clss-list");
    // Message = require("./message.js");



var Clss = React.createClass({
    _onChange: function() {
        // console.log("onchane",ClssStore.getClss());
        this.setState({
            clss: ClssStore.getClss(),           
        });  
    },
    getInitialState: function() {

        ClssActions.fetchAddClssFromServer();    
        return {
            clss: ClssStore.getClss(),          
           
        }
    },
    componentDidMount: function() {
        ClssStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Quản lý sinh viên</h1>
                    <div className="col-md-10 col-md-offset-1"> 
                    <ClssForm />               
                    <ClssList clss={this.state.clss} />

                </div>

            </div>
            
        );
    }
});

module.exports = Clss;