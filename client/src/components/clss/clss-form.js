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
          name: "", short_name: ""
        });
         $("#close").click();
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
           name: "", short_name: ""
        });
         $("#close").click();
         this._onclickClose;
    },
   
    _onchangname: function(e) {
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
                short_name: editingClss.short_name,
               
            });
        }
    },
    _onclickClose: function(){       
        this.setState({
            name: "",
            short_name:"",
        });
    },
    getInitialState: function() {
            return {
            name: "", short_name: "",           
            editingClss: null,            
        }
    },
    componentDidMount: function() {
        ClssStore.addEditClssListener(this._onEdit);
    },
    render: function() {
        var btnAdd = ( <button type="button" onClick={this._onClickAdd} className="btn btn-primary">Lưu</button>);
        var btnUpdate = (<button type="button" onClick={this._onClickUpdate} className="btn btn-primary">Update</button>);

        return (
            <div>
            <button type="button" onClick={this._onclickClose} className="btn btn-primary btn-lg pull-right" data-toggle="modal" data-target="#myModal">
              Thêm mới
            </button>  
           <p>&nbsp;</p>              
            <div className="modal fade" id="myModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" >
                <div className="modal-content" >
                  <div className="modal-header">
                    <button type="button" onClick={this._onclickClose} className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4 className="modal-title" id="myModalLabel">Thêm Sinh Viên mới</h4>
                  </div>
                  <div className="modal-body">
                    <form className="form-horizontal">
                      
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Họ</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.name} onChange={this._onchangname} ref="name" className="form-control" type="text" placeholder="Tên khoa" ref="title" name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên Đệm</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.short_name} onChange={this._onchangShortName} ref="short_name" className="form-control" type="text" placeholder="Trưởng khoa" ref="title" name="title"/>
                            </div>
                        </div>
                                       
                    </form>                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close" onClick={this._onclickClose} className="btn btn-default" data-dismiss="modal">Đóng</button>
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