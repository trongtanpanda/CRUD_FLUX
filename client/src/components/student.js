var React = require("react"),
    StudentActions = require("../actions/student-action.js"),
    // CourseActions = require('../actions/course-action'),
    StudentStore = require("../stores/student-store"), 
    // ComboCourse = require("./combb-course"),   
    StudentForm = require("./student/student-form"),
    ImportForm = require("./student/import-excel");
var Paginator = require("./student/Paginator.js");
var PER_PAGE = 10;
var X = require('xlsx');


var Student = React.createClass({
    _onChange: function() {
        var students =  StudentStore.getStudents(); 
        if(students.length > 0){
            this.onChangePage(1, students);
        }
        this.setState({
            students: StudentStore.getStudents(),           
        });   
    },
    getInitialState: function() {
        StudentActions.fetchAddStudentFromServer();        
        return {
            students: StudentStore.getStudents(),  
            firstname: "",
            midname: "",
            lastname: "",            
            deletingStudent: null, 
            id: null,        
           
        }
    },
    componentDidMount: function() {
        StudentStore.addChangeListener(this._onChange);  
        StudentStore.addDeleteStudentListener(this._onDelete);           
        
    },
    _onDelete: function() {        
        var deletingStudent = StudentStore.getDeleteStudent();
        // console.log(editingStudent);
        this.setState({
            deletingStudent: deletingStudent,
        });

        if (deletingStudent) {
            this.setState({
                firstname: deletingStudent.firstname,
                midname: deletingStudent.midname,
                lastname: deletingStudent.lastname,
                _id: deletingStudent._id,
            });
        }
    },
    onChangePage: function(page,dataEx) {
        
            console.log(StudentStore.getStudents());
           
            this.setState({
                loading: true,
                items: this.getData(page,StudentStore.getStudents()),
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
        var id = item.student_id;
        var firstname = item.firstname;
        var lastname = item.lastname;
        var gender;

        if(item.gender=="1" || item.gender==1){
            gender ="Nam";
        }else{
            gender = "Nữ";
        }
        var native = item.native;
       
        return <tr>
                    <td>{id}</td>
                    <td>{firstname}</td>
                    <td>{lastname}</td>
                    <td>{gender}</td>
                    <td>{native}</td>
                    <td><input type="button" data-toggle="modal" data-target="#myModal" value="Edit" className="btn btn-success light-blue accent-4" onClick={StudentActions.editStudent.bind(null,item._id)} /></td>
                    <td><input type="button" data-toggle="modal" data-target="#deleModal" value="delete" className="btn btn-danger red accent-2" onClick={StudentActions.deleteStudent.bind(null,item._id)} /></td>
                </tr>;
    },
    
    render: function() { 
        var total;
        var page;
        if(this.state.students){
            total =Math.ceil(this.state.students.length/PER_PAGE);
            console.log(total);
        }
        if(this.state.items){
            page = this.state.items.map(this.renderItem);
            console.log(page);
        }
        var studentsData=(
            <div>
                 <table className="table">
                    <thead>
                        <tr>
                            <th>Mã SV</th>
                            <th>Họ</th>
                            <th>Tên</th>
                            <th>Giới tính</th>
                            <th>Quê quán</th> 
                            <th>Edit</th>
                            <th>Delete</th>                            
                        </tr>
                    </thead>
                    <tbody>
                        {page}
                    </tbody>
                </table>                 
                <Paginator className="pull-right" max={total} onChange={this.onChangePage} />                
            </div>);
         var studentList = this.state.students.map(function(student, index) {
          
            return (
                <tr key={index}>
                    <td>{student.student_id}</td> 
                    <td>{student.firstname}  {student.lastname}</td>                                       
                                      
                    <td><input type="button" data-toggle="modal" data-target="#myModal" value="Edit" className="btn btn-success" onClick={StudentActions.editStudent.bind(null,student._id)} /></td>
                    <td><input type="button" data-toggle="modal" data-target="#deleModal" value="delete" className="btn btn-danger" onClick={StudentActions.deleteStudent.bind(null,student._id)} /></td>
                </tr>
            );
        }.bind(this));

        return (
            
        <div>
            
            <div className="col-md-10 col-md-offset-1">            
            <h3 className="text-left">Quản lý sinh viên</h3>            
            <ImportForm />
            <StudentForm />                   
                <div>
                    {studentsData}
                    <div className="modal fade" id="deleModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
                      <div className="modal-dialog" >
                        <div className="modal-content">
                          <div className="modal-header">
                            <button type="button"  className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                            <h4 className="modal-title" id="myModalLabel">Xóa sinh viên</h4>
                          </div>
                          <div className="modal-body">
                          Bạn có muốn xóa sinh viên {this.state.firstname} {this.state.midname} {this.state.lastname}?
                          </div>
                          <div className="modal-footer">
                            <button type="button" id="close"  className="btn btn-default" data-dismiss="modal">Đóng</button>
                            <button type="button" id="close"  className="btn btn-default" data-dismiss="modal" onClick={StudentActions.destroy.bind(null,this.state._id)}>DELETE</button>

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

module.exports = Student;