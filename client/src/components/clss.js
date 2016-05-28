var React = require("react"),
    ClssActions = require("../actions/clss-action.js"),
    // CourseActions = require('../actions/course-action'),
    ClssStore = require("../stores/clss-store"), 
    // ComboCourse = require("./combb-course"),   
    ClssForm = require("./clss/clss-form");
var Paginator = require("./clss/Paginator.js");
var PER_PAGE = 10;
var X = require('xlsx');


var Clss = React.createClass({
    _onChange: function() {
        var clss =  ClssStore.getClss(); 
        if(clss.length > 0){
            this.onChangePage(1, clss);
        }
        this.setState({
            clss: ClssStore.getClss(),           
        });   
    },
    getInitialState: function() {
        ClssActions.fetchAddClssFromServer();    
        return {
            clss: ClssStore.getClss(),  
            name: "",
            short_name: "",                      
            deletingClss: null, 
            id: null,        
            pages: 1,
        }
    },
    componentDidMount: function() {
        ClssStore.addChangeListener(this._onChange);  
        ClssStore.addDeleteClssListener(this._onDelete);           
        
    },
    _onDelete: function() {        
        var deletingClss = ClssStore.getDeleteClss();
        // console.log(editingClss);
        this.setState({
            deletingClss: deletingClss,
        });

        if (deletingClss) {
            this.setState({
                name: deletingClss.name,
                short_name: deletingClss.short_name,
                _id: deletingClss._id,
            });
        }
    },
    onChangePage: function(page,dataEx) { 
            this.setState({
                loading: true,
                items: this.getData(page,ClssStore.getClss()),
                pages: page,
            });
    },
    
    getData: function(page,dataEx) {
        var list= [];
        var start =PER_PAGE *(page-1);
        var end = start + PER_PAGE;
        if(end >dataEx.length){
            end= dataEx.length;
        }
        for(var i= start; i< end; i++){           
                list.push(dataEx[i]);            
        }        
        return list;
    },
    renderItem: function(item) {
        
       
    },
    
    render: function() { 
        var total;
        var page;
        if(this.state.clss){
            total =Math.ceil(this.state.clss.length/PER_PAGE);            
        }
        if(this.state.items){
            var curentPage =this.state.pages;
            page = this.state.items.map(function(item,index){
               
                var name = item.name;
                var short_name = item.short_name;              
                var no = ((curentPage-1)*PER_PAGE)+ index + 1;  
                return <tr>
                            <td>
                               {no}
                            </td>                            
                            <td>{name}</td>
                            <td>{short_name}</td>                            
                            <td>
                                <button type="button" data-toggle="modal" data-target="#myModal"  className="btn btn-success light-blue accent-4 glyphicon glyphicon-pencil" onClick={ClssActions.editClss.bind(null,item._id)}  ></button>
                                &nbsp;
                                <button type="button" data-toggle="modal" data-target="#deleModal"  className="btn btn-danger red accent-2 glyphicon glyphicon-trash" onClick={ClssActions.deleteClss.bind(null,item._id)} ></button>
                            </td>
                        </tr>;
            })
        }
        var clssData=(
            <div>
                 <table className="table">
                    <thead>
                        <tr>    
                            <th>STT</th>                            
                            <th>Tên</th>
                            <th>Tên rút gọn</th>                            
                            
                            <th></th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {page}
                    </tbody>
                </table>                 
                <Paginator className="pull-right" max={total} onChange={this.onChangePage} />                
            </div>);        

        return (
            
        <div>
            
            <div className="col-md-10 col-md-offset-1">                        
            <h3 className="text-left">Quản lý Lớp sinh hoạt</h3>

                <ClssForm />      
                <div>
                    {clssData}
                    <div className="modal fade" id="deleModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
                      <div className="modal-dialog" >
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button"  className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4 className="modal-title" id="myModalLabel">Xóa Lớp sinh hoạt</h4>
                          </div>
                          <div className="modal-body">
                          Bạn có muốn xóa lớp sinh hoạt {this.state.name} ?
                          </div>
                          <div className="modal-footer">
                            <button type="button" id="close"  className="btn btn-kind-one grey" data-dismiss="modal">Đóng</button>
                            <button type="button" id="close"  className="btn btn-default" data-dismiss="modal" onClick={ClssActions.destroy.bind(null,this.state._id)}>Xóa</button>

                          </div>
                        </div>
                      </div>
                    </div>
                </div>                   
            </div>
        </div>
            
        );
    }
});

module.exports = Clss;