var React = require("react"),
    TermClassStore = require("../../stores/termClass-store"),
    TermClassActions = require("../../actions/termClass-action.js");
var Confirm = require('react-confirm-bootstrap');
var TermClassList = React.createClass({
     _onDelete: function() {        
        var deletingTermClass = TermClassStore.getDeleteTermClass();
        // console.log(editingTermClass);
        this.setState({
            deletingTermClass: deletingTermClass,
        });

        if (deletingTermClass) {
            this.setState({
                name: deletingTermClass.name,
                _id: deletingTermClass._id,
            });
        }
    },
    getInitialState: function() {
            return {
            name: "",            
            deletingTermClass: null, 
            id: null,           
        }
    },
    componentDidMount: function() {
        TermClassStore.addDeleteTermClassListener(this._onDelete);
    },
    render: function() {
        console.log(this.props.termClasss);
        var termClassList = this.props.termClasss.map(function(termClass, index) {
          
            return (
                <tr key={index}>
                    <td>{termClass.termClass_id}</td>    
                    <td>{termClass.name}</td>  
                    <td>{termClass.number}</td>  
                    <td>{termClass.theory}</td>  
                    <td>{termClass.diligence}</td>  
                    <td>{termClass.practive}</td>  
                    <td>{termClass.self_taught}</td>  
                    <td>{termClass.perceive}</td>  
                    <td>{termClass.last_test}</td>                                      
                                      
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#myModal" value="Edit" className="btn btn-success" onClick={TermClassActions.editTermClass.bind(null,termClass._id)} /></td>
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#deleModal" value="delete" className="btn btn-danger" onClick={TermClassActions.deleteTermClass.bind(null,termClass._id)} /></td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>                        
                        {termClassList}
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
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal" onClick={TermClassActions.destroy.bind(null,this.state._id)}>DELETE</button>

                  </div>
                </div>
              </div>
            </div>
            </div>
        );
    }
});

module.exports = TermClassList;