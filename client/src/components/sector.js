var React = require("react"),
    SectorActions = require("../actions/sector-action"),    
    SectorStore = require("../stores/sector-store"),     
    SectorList = require("./sector/sector-list");
    // Message = require("./message");



var Sector = React.createClass({
     componentWillMount: function() {
        this.setState({
            sectors: SectorStore.getSectors()            
        });
        
    },
    _onChange: function() {
        this.setState({
            sectors: SectorStore.getSectors(),            
        }); 
       
               
    },
    getInitialState: function() {
        SectorActions.fetchAddSectorFromServer();        
        return {
            sectors: SectorStore.getSectors(),           
        }
         this.setState({
            sectors: SectorStore.getSectors(),            
        }); 
    },
    componentDidMount: function() {
        SectorStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Ngành</h1>
                    <div className="col-md-10 col-md-offset-1">                                                       
                                 
                    <SectorList sectors={this.state.sectors} />
                </div>

            </div>
            
        );
    }
});

module.exports = Sector;