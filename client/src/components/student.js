var React = require("react"),
    StudentActions = require("../actions/student-action.js"),
    // CourseActions = require('../actions/course-action'),
    StudentStore = require("../stores/student-store"), 
    // ComboCourse = require("./combb-course"),   
    StudentForm = require("./student/student-form"),
    ImportForm = require("./student/import-excel"),
    StudentList = require("./student/student-list");

    // Message = require("./message.js");
var X = require('xlsx');


var Student = React.createClass({
    _onChange: function() {
        // console.log("onchane",StudentStore.getStudents());
        this.setState({
            students: StudentStore.getStudents(),
           
        }); 
      
               
    },
    getInitialState: function() {
        StudentActions.fetchAddStudentFromServer();       
        return {
            students: StudentStore.getStudents(),          
           
        }
    },
    componentDidMount: function() {
        StudentStore.addChangeListener(this._onChange);             
        
    },
   
    // _upload: function(e){
    //     var files = e.target.files;
    //     var f = files[0];        
    //     {
    //         var reader = new FileReader();
    //         var name = f.name;
    //         reader.onload = function(e) {
    //             var data = e.target.result;  
    //             var wb = X.read(data, {type: 'binary'}); 
    //             var a = process_wb(wb);
    //             console.log(Object.keys(a).length);
    //         };
    //         reader.readAsBinaryString(f);       
    //     };
    // },
    
    render: function() { 

        return (
            
            <div>
                <h1 className="text-center">Quản lý sinh viên</h1>
                    <div className="col-md-10 col-md-offset-1"> 
                    
                   
                    <ImportForm />
                    <StudentForm />                   
                    <StudentList students={this.state.students} />

                </div>

            </div>
            
        );
    }
});

module.exports = Student;