var React = require("react"),
    SectorActions = require("../actions/sector-action.js"),
    // CourseActions = require('../actions/course-action'),
    SectorStore = require("../stores/sector-store"), 
    // ComboCourse = require("./combb-course"),   
    SectorForm = require("./sector/sector-form"),
    SectorList = require("./sector/sector-list");
    // Message = require("./message.js");



var Sector = React.createClass({
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
    },
    componentDidMount: function() {
        SectorStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Quản lý Ngành</h1>
                    <div className="col-md-10 col-md-offset-1"> 
                    <SectorForm />                   
                    <SectorList sectors={this.state.sectors} />

                </div>

            </div>
            
        );
    }
});

module.exports = Sector;