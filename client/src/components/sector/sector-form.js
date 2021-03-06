var React = require("react"),    
    SectorStore = require("../../stores/sector-store"),
    SectorActions = require("../../actions/sector-action.js");

var SectorForm = React.createClass({
    
    _onClickAdd: function() {
         var sector = {
            sector_id: this.state.sector_id,
            name: this.state.name,
            short_name: this.state.short_name,
            english_name: this.state.english_name
        };

        SectorActions.create(sector);
        this.setState({
           sector_id:"", name: "", short_name: "", english_name: ""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onClickUpdate: function() {
        var editingSector = this.state.editingSector;        
        var user ={
            _id:editingSector._id,
            sector_id: this.state.sector_id,
            name: this.state.name,
            short_name: this.state.short_name,
            english_name: this.state.english_name
        };
        SectorActions.update(user);
        this.setState({
            sector_id:"", name: "", short_name: "", english_name: ""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onchangId: function(e){        
        this.setState({
            sector_id: e.target.value,
        });
    },
    _onchangname: function(e) {
        this.setState({
            name: e.target.value, 
        });
    },
    _onchangshort_name: function(e) {
        this.setState({
            short_name: e.target.value, 
        });
    },
    _onchangenglish_name: function(e) {
        this.setState({
            english_name: e.target.value, 
        });
    },
    _onEdit: function() {  
        var editingSector = SectorStore.getEditingSectors();
        this.setState({
            editingSector: editingSector,
        });

        if (editingSector) {
            this.setState({
                sector_id: editingSector.sector_id,
                name: editingSector.name,
                short_name: editingSector.short_name,
                english_name: editingSector.english_name,
            });
        }
    },
    _onclickClose: function(){       
        this.setState({                        
            sector_id: "",
            name: "",
            short_name:"",
            english_name: "",           
            editingSector: "",                  
        });
    },
    getInitialState: function() {
            return {
            sector_id: "", first: "", short_name: "", english_name: "",            
            editingSector: null,            
        }
    },
    componentDidMount: function() {
        SectorStore.addEditSectorListener(this._onEdit);
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
                            <label htmlFor="title" className="col-sm-2 control-label">Mã Sinh viên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.sector_id} onChange={this._onchangId} ref="sector_id" className="form-control" type="text" placeholder="Mã khoa" ref="title" name="title"/>
                            </div>                       
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Họ</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.name} onChange={this._onchangname} ref="name" className="form-control" type="text" placeholder="Tên khoa" ref="title" name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên Đệm</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.short_name} onChange={this._onchangshort_name} ref="short_name" className="form-control" type="text" placeholder="Trưởng khoa" ref="title" name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.english_name} onChange={this._onchangenglish_name} ref="english_name" className="form-control" type="text" placeholder="Giáo vụ" ref="title" name="title"/>
                            </div>
                        </div>                      
                    </form>                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close" onClick={this._onclickClose} className="btn btn-default" data-dismiss="modal">Đóng</button>
                     {this.state.editingSector ? btnUpdate : btnAdd}
                  </div>
                </div>
              </div>
            </div>             
            
        </div>
        );
    }
});

module.exports = SectorForm;