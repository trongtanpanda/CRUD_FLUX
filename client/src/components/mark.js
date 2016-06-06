var React = require("react"),
    MarkActions = require("../actions/mark-action.js"),
    TermClassActions = require("../actions/termClass-action.js"),
    MarkStore = require("../stores/mark-store"), 
    // ComboCourse = require("./combb-course"),   
    MarkForm = require("./mark/mark-form"),
    StudentActions = require("../actions/student-action.js"),
    ImportForm = require("./mark/import-excel");
    MarkList = require("./mark/mark-list");
    
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
        StudentActions.getAllStudent();
        TermClassActions.fetchAddTermClassFromServer();
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
                            <td>{item.student.student_id}</td>
                            <td>{item.student.firstname} {item.student.lastname}</td>
                            <td>{item.termClass.name}</td>
                            <td>{item.cc}</td>
                            <td>{item.gk}</td>
                            <td>{item.ck}</td>

                            <td>
                                <button type="button" data-toggle="modal" data-target="#myModal"  className="btn btn-success light-blue accent-4 glyphicon glyphicon-pencil" onClick={MarkActions.editMark.bind(null,item._id)} ></button>
                               
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
                            <th>Mã sinh viên</th>
                            <th>Sinh viên</th>
                            <th>Lớp học phần</th>
                            <th>Chuyên cần</th>
                            <th>Giữa kỳ</th>
                            <th>Cuối kỳ</th>
                            <th>Chỉnh sửa</th>
                                                      
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
            <h3 className="text-left">Quản lý điểm</h3>
            <ImportForm />
            <MarkForm />                   
                <div>
                    {termClassData}
                                   
                </div>                   
            </div>
        </div>
            
        );
    }
});

module.exports = Mark;