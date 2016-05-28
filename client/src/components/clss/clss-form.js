var React = require("react"),    
    ClssStore = require("../../stores/clss-store"),
    ClssActions = require("../../actions/clss-action.js");

var ClssForm = React.createClass({
    
    _onClickAdd: function() {
         var clss = {
            
            name: this.state.name,            
            short_name: this.state.short_name,
           
        };

        ClssActions.create(clss);
        this.setState({
           name:"", short_name: ""
        });
         $('#myModal').modal('hide');
         this._onclickClose;
    },
    _onClickUpdate: function() {
        var editingClss = this.state.editingClss;        
        var user ={
            _id:editingClss._id,
            name: this.state.name,            
            short_name: this.state.short_name,
        };
        ClssActions.update(user);
        this.setState({
           name:"", short_name: ""
        });
        $('#myModal').modal('hide');
         this._onclickClose;
    },  
    _onchangName: function(e) {
        this.setState({
            name: e.target.value, 
        });
    },
    _onchangShortName: function(e) {
        this.setState({
            short_name: e.target.value, 
        });
    },
   
    _onEdit: function() {  
        var editingClss = ClssStore.getEditingClsss();
        this.setState({
            editingClss: editingClss,
        });

        if (editingClss) {
            this.setState({
                name: editingClss.name,
                short_name: editingClss.short_name  
            });
        }
    },
    _onclickClose: function(){       
        this.setState({                        
            name:"", short_name: "",     
           editingClss: "",                  
        });
         $(".input-field label").removeClass("active");
    },
    getInitialState: function() {
        return {
            name:"", short_name: "",      
            editingClss: null,            
        }
    },
    componentDidMount: function() {
        ClssStore.addEditClssListener(this._onEdit);
    },
    render: function() {
        if(this.state.editingClss){
            $(".input-field label").addClass("active");
        }
        var btnAdd = ( <button type="button" onClick={this._onClickAdd} className="btn btn-primary">Lưu</button>);
        var btnUpdate = (<button type="button" onClick={this._onClickUpdate} className="btn btn-primary">Cập nhật</button>);

        return (
        <div>
            <div className="button-main" >
            <button type="button" onClick={ClssForm._onclickClose} className="btn btn-primary btn-lg pull-right btn-kind-one light-blue accent-4" data-toggle="modal" data-target="#myModal">
              Thêm mới
            </button> 
            </div>   
                         
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" >
                <div className="modal-content" >
                  <div className="modal-header">
                    <button type="button" onClick={this._onclickClose} className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4 className="modal-title" id="myModalLabel">Thêm Lớp sinh hoạt</h4>
                  </div>
                  <div className="modal-body">
                    <form className="form-horizontal">
                       
                        <div className="row">
                            <div className="input-field col s6">
                              <input id="firstname" value={this.state.name} onChange={this._onchangName} ref="name" type="text" className="validate"/>
                              <label for="firstname">Tên</label>
                            </div>
                        
                            <div className="input-field col s6">
                              <input id="lastname" value={this.state.short_name} onChange={this._onchangShortName} ref="short_name" type="text" className="validate"/>
                              <label for="lastname">Tên viết tắt</label>
                            </div>
                        </div>                  
                        
                    </form>                    
                  </div>
                  <div className="modal-footer">                      
                    <button type="button" id="close" onClick={this._onclickClose} className="btn btn-kind-one grey" data-dismiss="modal">Đóng</button>
                    {this.state.editingClss ? btnUpdate : btnAdd}                     
                  </div>
                </div>
              </div>
            </div>             
            
        </div>
        );
    }
});

module.exports = ClssForm;