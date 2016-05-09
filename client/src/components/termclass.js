var React = require("react"),
    TermClassActions = require("../actions/termClass-action.js"),
    // CourseActions = require('../actions/course-action'),
    TermClassStore = require("../stores/termClass-store"), 
    // ComboCourse = require("./combb-course"),   
    TermClassForm = require("./termClass/termClass-form"),
    TermClassList = require("./termClass/termClass-list");
    // Message = require("./message.js");
var Paginator = require("./termClass/Paginator.js");
var PER_PAGE = 10;


var TermClass = React.createClass({
    _onChange: function() {

        var termClasss = TermClassStore.getTermClasss();       
        if(termClasss.length > 0){
            this.onChangePage(1, termClasss);
        }
         this.setState({
            termClasss: termClasss           
        });   
    },
    getInitialState: function() {
        TermClassActions.fetchAddTermClassFromServer();  
        return {
            termClasss: TermClassStore.getTermClasss(), 
            deletingTermClass: null, 
            id: null,        
            pages: 1,  
            name: null,
        }
    },
    componentDidMount: function() {
        TermClassStore.addChangeListener(this._onChange);             
        TermClassStore.addDeleteTermClassListener(this._onDelete);     
    },
    _onDelete: function() {        
        var deletingTermClass = TermClassStore.getDeleteTermClass();
        this.setState({
            deletingTermClass: deletingTermClass,            
        });

        if (deletingTermClass) {
            this.setState({            
                _id: deletingTermClass._id,
                name: deletingTermClass.name,
            });
        }
    },
    onChangePage: function(page,dataEx) { 
            this.setState({
                loading: true,
                items: this.getData(page,TermClassStore.getTermClasss()),
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
    render: function() { 
        var total;
        var page;
        if(this.state.termClasss){
            total =Math.ceil(this.state.termClasss.length/PER_PAGE);                    
        }
        if(this.state.items){
            var curentPage =this.state.pages;

            page = this.state.items.map(function(item,index){
                var id = item.termClass_id;
                var name = item.name;
                var number = item.number;
                var theory = item.theory;
                var diligence = item.diligence;
                 var no = ((curentPage-1)*PER_PAGE)+ index + 1;
               
                return <tr>
                            <td>
                               {no}
                            </td>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>{number}</td>
                            <td>{theory}</td>
                            <td>{diligence}</td>
                            <td>
                                <button type="button" data-toggle="modal" data-target="#detailClass"  className="btn btn-success light-blue accent-4 glyphicon glyphicon-list-alt" ></button>
                            </td>
                            <td>
                                <button type="button" data-toggle="modal" data-target="#myModal"  className="btn btn-success light-blue accent-4 glyphicon glyphicon-pencil" onClick={TermClassActions.editTermClass.bind(null,item._id)} ></button>
                                &nbsp;
                                <button type="button" data-toggle="modal" data-target="#deleModal"  className="btn btn-danger red accent-2 glyphicon glyphicon-trash" onClick={TermClassActions.deleteTermClass.bind(null,item._id)} ></button>
                            </td>                            
                        </tr>;
            })
        }
        var termClassData=(
            <div>
                 <table className="table">
                    <thead>
                        <tr>    
                            <th>STT</th>
                            <th>Mã Lớp học phân</th>
                            <th>Tên</th>
                            <th>Số tín chỉ</th>
                            <th>lý thuyết</th>
                            <th>Chuyên cần</th>
                            <th>Danh sách sinh viên</th>
                            <th>Action</th>
                                                      
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
            <h3 className="text-left">Quản lý Lớp học phần</h3>
            
            <TermClassForm />                   
                <div>
                    {termClassData}
                    <div className="modal fade" id="deleModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
                      <div className="modal-dialog" >
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button"  className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4 className="modal-title" id="myModalLabel">Xóa lớp học phần</h4>
                          </div>
                          <div className="modal-body">
                          Bạn có muốn xóa Lớp học phần {this.state.name}?
                          </div>
                          <div className="modal-footer">
                            <button type="button" id="close"  className="btn btn btn-kind-one grey" data-dismiss="modal">Đóng</button>&nbsp;
                            <button type="button" id="close"  className="btn btn-default" data-dismiss="modal" onClick={TermClassActions.destroy.bind(null,this.state._id)}>DELETE</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="modal fade" id="detailClass" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
                      <div className="modal-dialog" >
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button"  className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4 className="modal-title" id="myModalLabel">Chi tiết</h4>
                          </div>
                          <div className="modal-body">
                         
                          </div>
                          <div className="modal-footer">
                            <button type="button" id="close"  className="btn btn btn-kind-one grey" data-dismiss="modal">Đóng</button>&nbsp;
                            
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

module.exports = TermClass;