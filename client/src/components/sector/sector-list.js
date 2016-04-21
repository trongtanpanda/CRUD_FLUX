var React = require("react"),
    SectorStore = require("../../stores/sector-store"),
    SectorActions = require("../../actions/sector-action.js");
var Confirm = require('react-confirm-bootstrap');
var SectorList = React.createClass({
     _onDelete: function() {        
        var deletingSector = SectorStore.getDeleteSector();
        // console.log(editingSector);
        this.setState({
            deletingSector: deletingSector,
        });

        if (deletingSector) {
            this.setState({
                name: deletingSector.firstname,
                _id: deletingSector._id,
            });
        }
    },
    getInitialState: function() {
            return {
            name: "",            
            deletingSector: null, 
            id: null,           
        }
    },
    componentDidMount: function() {
        SectorStore.addDeleteSectorListener(this._onDelete);
    },
    render: function() {
        var sectorList = this.props.sectors.map(function(sector, index) {
          
            return (
                <tr key={index}>
                    <td>{sector.sector_id}</td> 
                    <td>{sector.name}</td>                                       
                    <td>{sector.short_name}</td>  
                    <td>{sector.english_name}</td>                            
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#myModal" value="Edit" className="btn btn-success" onClick={SectorActions.editSector.bind(null,sector._id)} /></td>
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#deleModal" value="delete" className="btn btn-danger" onClick={SectorActions.deleteSector.bind(null,sector._id)} /></td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>                        
                        {sectorList}
                    </tbody>
                </table>
                   <div className="modal fade" id="deleModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" >
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button"  className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4 className="modal-title" id="myModalLabel">Thêm khoa mới</h4>
                  </div>
                  <div className="modal-body">
                   {this.state.name}
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal">Đóng</button>
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal" onClick={SectorActions.destroy.bind(null,this.state._id)}>DELETE</button>

                  </div>
                </div>
              </div>
            </div>
            </div>
        );
    }
});

module.exports = SectorList;