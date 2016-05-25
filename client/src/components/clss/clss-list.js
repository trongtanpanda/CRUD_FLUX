var React = require("react"),
    ClssStore = require("../../stores/clss-store"),
    ClssActions = require("../../actions/clss-action.js");
var Confirm = require('react-confirm-bootstrap');
var ClssList = React.createClass({
     _onDelete: function() {        
        var deletingClss = ClssStore.getDeleteClss();
        // console.log(editingClss);
        this.setState({
            deletingClss: deletingClss,
        });

        if (deletingClss) {
            this.setState({
                name: deletingClss.name,
                _id: deletingClss._id,
            });
        }
    },
    getInitialState: function() {
            return {
            name: "",            
            deletingClss: null, 
            id: null,           
        }
    },
    componentDidMount: function() {
        ClssStore.addDeleteClssListener(this._onDelete);
    },
    render: function() {
        var ClssList = this.props.clss.map(function(clss, index) {
          
            return (
                <tr key={index}>
                    
                    <td>{clss.name}</td>                                     
                    <td>{clss.incoming_year}</td>
                                    
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#myModal" value="Edit" className="btn btn-success" onClick={ClssActions.editClss.bind(null,clss._id)} /></td>
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#deleModal" value="delete" className="btn btn-danger" onClick={ClssActions.deleteClss.bind(null,clss._id)} /></td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>
                        
                        {ClssList}
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
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal" onClick={ClssActions.destroy.bind(null,this.state._id)}>DELETE</button>

                  </div>
                </div>
              </div>
            </div>
            </div>
        );
    }
});

module.exports = ClssList;