var React = require("react"),
    MarkActions = require("../actions/mark-action.js"),
    // CourseActions = require('../actions/course-action'),
    MarkStore = require("../stores/mark-store"), 
    // ComboCourse = require("./combb-course"),   
    MarkForm = require("./mark/mark-form"),
    MarkList = require("./mark/mark-list");
    // Message = require("./message.js");
var Paginator = require("./mark/Paginator.js");
var PER_PAGE = 10;



var Mark = React.createClass({
    _onChange: function() {
        
        var marks = MarkStore.getMarks();       
        if(marks.length > 0){
            this.onChangePage(1, marks);
        }
        this.setState({
            marks: marks           
        });   
    },

    getInitialState: function() {
        MarkActions.fetchAddMarkFromServer();       
        return {
            marks: MarkStore.getMarks(),          
            id: null,        
            pages: 1,  
        }
    },
    componentDidMount: function() {
        MarkStore.addChangeListener(this._onChange); 
        MarkStore.addDeleteMarkListener(this._onDelete);              
        
    },
    _onDelete: function() {        
        var deletingMark = MarkStore.getDeleteMark();
        this.setState({
            deletingMark: deletingMark,            
        });

        if (deletingMark) {
            this.setState({            
                _id: deletingMark._id,                
            });
        }
    },
    onChangePage: function(page,dataEx) { 
            this.setState({
                loading: true,
                items: this.getData(page,MarkStore.getMarks()),
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
        if(this.state.marks){
            total =Math.ceil(this.state.marks.length/PER_PAGE);                    
        }
        if(this.state.items){
            var curentPage =this.state.pages;

            page = this.state.items.map(function(item,index){
               
                 var no = ((curentPage-1)*PER_PAGE)+ index + 1;
               
                return <tr>
                            <td>{no}</td>
                            <td>{item.student}</td>
                            <td>{item.termClass}</td>
                            <td>{item.cc}</td>
                            <td>{item.gk}</td>
                          
                            <td>
                                <button type="button" data-toggle="modal" data-target="#myModal"  className="btn btn-success light-blue accent-4 glyphicon glyphicon-pencil" onClick={MarkActions.editMark.bind(null,item._id)} ></button>
                                &nbsp;
                                <button type="button" data-toggle="modal" data-target="#deleModal"  className="btn btn-danger red accent-2 glyphicon glyphicon-trash" onClick={MarkActions.deleteMark.bind(null,item._id)} ></button>
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
                            <th>sinh viên</th>
                            <th>lớp học phần</th>
                            <th>chuyên cần</th>
                            <th>giữa kỳ</th>
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
            
            <MarkForm />                   
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
                          Bạn có muốn xóa Lớp học phần ?
                          </div>
                          <div className="modal-footer">
                            <button type="button" id="close"  className="btn btn btn-kind-one grey" data-dismiss="modal">Đóng</button>&nbsp;
                            <button type="button" id="close"  className="btn btn-default" data-dismiss="modal" onClick={MarkActions.destroy.bind(null,this.state._id)}>DELETE</button>
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

module.exports = Mark;