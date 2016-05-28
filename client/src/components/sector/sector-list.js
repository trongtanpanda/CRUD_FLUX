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
                    <td>{index +1}</td>
                    <td>{sector.sector_id}</td> 
                    <td>{sector.name}</td>                                       
                    <td>{sector.short_name}</td>  
                    <td>{sector.english_name}</td>  
                    <td>
                        <button type="button" data-toggle="modal" data-target="#myModal"  className="btn btn-success light-blue accent-4 glyphicon glyphicon-pencil" onClick={SectorActions.editSector.bind(null,sector._id)}  ></button>
                        &nbsp;
                        <button type="button" data-toggle="modal" data-target="#deleModal"  className="btn btn-danger red accent-2 glyphicon glyphicon-trash" onClick={SectorActions.deleteSector.bind(null,sector._id)} ></button>                          
                    </td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>  
                    <thead>
                        <tr>    
                            <th>STT</th> 
                            <th>Mã ngành</th>                            
                            <th>Tên ngành</th>
                            <th>Tên viết tắt</th>                            
                             <th>Tên tiếng anh</th>   
                            <th></th>                            
                        </tr>
                    </thead>                      
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