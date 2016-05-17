var React = require("react"),
    TermClassActions = require("../actions/termClass-action.js"),
    // CourseActions = require('../actions/course-action'),
    TermClassStore = require("../stores/termClass-store"), 
    MarkStore = require("../stores/mark-store"), 
    TermClassForm = require("./termClass/termClass-form"),
    TermClassList = require("./termClass/termClass-list"),
    MarkActions = require("../actions/mark-action.js"),
    StudentActions = require("../actions/student-action.js"),
    StudentStore = require("../stores/termClass-store");
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
    _onGetStudent: function(){
         this.setState({
            student: StudentStore.getStudents(),
        });      
    },
    _onSearch: function(){
        StudentActions.findForMArk(this.state.text,this.state.select);
    },
    getInitialState: function() {
        TermClassActions.fetchAddTermClassFromServer();  
        return {
            termClasss: TermClassStore.getTermClasss(), 
            deletingTermClass: null, 
            id: null,        
            pages: 1,  
            name: null,
            text: "",
            select: null,
            student: "",
        }
    },
    _getListByTerm: function(){
        this.setState({
            listByTerm: MarkStore.getMarks(),
        });        
    },
    componentDidMount: function() {
        TermClassStore.addChangeListener(this._onChange);             
        TermClassStore.addDeleteTermClassListener(this._onDelete);  
        MarkStore.getListChangeListener(this._getListByTerm);
        StudentStore.addChangeListener(this._onGetStudent);

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
    _onChangeText: function(e){
        this.setState({
            text: e.target.value
        });
    },
    _onChangeSelect: function(e){
        this.setState({
            select: e.target.value
        });
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
        var listByTerm;
        if(this.state.listByTerm){
            listByTerm = this.state.listByTerm.map(function(item, index){
                var student = item.student;
                var termClass =item.termClass;
                 return <tr>                           
                            <td>{student}</td>
                            <td>{termClass}</td>
                        </tr>

            });
        }
        var listStudent;
        if(this.state.student){
            listStudent = this.state.student.map(function(item, index){
                var id = item.student_id;
                var firstname =item.firstname;
                var lastname =item.lastname;
                 return <tr>
                            <td>
                            </td>                       
                            <td>{id}</td>
                            <td>{firstname}</td>
                            <td>{lastname}</td>
                        </tr>

            });
        }
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
                                <button type="button" data-toggle="modal" data-target="#detailClass"  className="btn btn-success light-blue accent-4 glyphicon glyphicon-list-alt" onClick={MarkActions.getStudentByTermClass.bind(null,item._id)} ></button>
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
        var listByTermData =(<div>
                 <table className="table">
                    <thead>
                        <tr> 
                            <th>Mã Lớp học phân</th>
                            <th>Tên</th>              
                        </tr>
                    </thead>
                    <tbody>
                        {listByTerm}
                    </tbody>
                </table>       
            </div>) 
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
                      <div className="modal-dialog modal-liststudentbyterm" >
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button"  className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4 className="modal-title" id="myModalLabel">Danh sách sinh viên</h4>
                          </div>
                          <div className="modal-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="col-lg-12 form-search">
                                        <div className="input-field col s5">
                                          <input id="inputname" onChange={this._onChangeText} value={this.state.text} ref="inputname" type="text" className="validate"/>
                                          <label for="inputname">Enter value</label>
                                        </div>
                                         <select className="form-control col s4 select-dropdown" onChange={this._onChangeSelect}>                        
                                            <option value="">Chọn lớp</option>
                                            <option value="CĐ14B1">CĐ14B1</option>
                                            <option value="1">10T2</option>
                                        </select>
                                        <button type="button"  className="col s2 buttom-search btn btn btn-kind-one grey glyphicon glyphicon-search" onClick={this._onSearch}></button>
                                    </div>
                                    <input
        type="checkbox"
        value="123"
        
      /> 123123                             
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th></th> 
                                                <th>Mã sinh viên</th>
                                                <th>Họ</th>  
                                                <th>Tên</th>               
                                            </tr>
                                        </thead>
                                        <tbody>
                                        
                                            {listStudent}

                                        </tbody>
                                    </table>   
                                </div>
                                <div className="col-lg-6 right-content">{listByTermData}</div>
                            </div>
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