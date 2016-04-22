var React = require("react"),
    MarkStore = require("../../stores/mark-store"),
    MarkActions = require("../../actions/mark-action.js");
var Confirm = require('react-confirm-bootstrap');
var MarkList = React.createClass({
     _onDelete: function() {        
        var deletingMark = MarkStore.getDeleteMark();
        // console.log(editingMark);
        this.setState({
            deletingMark: deletingMark,
        });

        if (deletingMark) {
            this.setState({
                firstname: deletingMark.firstname,
                _id: deletingMark._id,
            });
        }
    },
    getInitialState: function() {
            return {
            firstname: "",            
            deletingMark: null, 
            id: null,           
        }
    },
    componentDidMount: function() {
        MarkStore.addDeleteMarkListener(this._onDelete);
    },
    render: function() {
        var markList = this.props.marks.map(function(mark, index) {
          
            return (
                <tr key={index}>
                    <td>{mark.student}</td> 
                    <td>{mark.termClass}</td> 
                    <td>{mark.cc}</td> 
                    <td>{mark.gk}</td> 
                    <td>{mark.tbkt}</td> 
                    <td>{mark.t1}</td> 
                    <td>{mark.tkml1}</td> 
                    <td>{mark.t2}</td> 
                    <td>{mark.tkml2}</td>  
                    <td>{mark.t3}</td>   
                    <td>{mark.by_text}</td>                                        
                    <td>{mark.by_number}</td>                     
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#myModal" value="Edit" className="btn btn-success" onClick={MarkActions.editMark.bind(null,mark._id)} /></td>
                    
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>                        
                        {markList}
                    </tbody>
                </table>                  
            </div>
        );
    }
});

module.exports = MarkList;