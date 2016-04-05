var React = require("react"),    
    UserStore = require("../../stores/student-store"),
    StudentActions = require("../../actions/student-action.js");

var StudentForm = React.createClass({
    
    _onClickAdd: function() {
         var student = {course: React.findDOMNode(this.refs.course).value.trim(), name: React.findDOMNode(this.refs.name).value.trim()};

        StudentActions.create(student);
        this.setState({
            name: "", courser:"",
        });

    },
    _onClickUpdate: function() {
        var editingStudent = this.state.editingStudent;        
        var user ={_id:editingStudent._id, name: this.state.name, course: this.state.courser};
        StudentActions.update(user);
        this.setState({
            name: "",
        });
    },
    _onchangCourse: function(e){        
        this.setState({
            courser: e.target.value,
        });
    },
    _onChangeName: function(e) {
        this.setState({
            name: e.target.value, 
        });
    },
    _onEdit: function() {        
        var editingStudent = UserStore.getEditingStudent();
        // console.log(editingStudent);
        this.setState({
            editingStudent: editingStudent,
        });

        if (editingStudent) {
            this.setState({
                name: editingStudent.name,
                courser: editingStudent.course._id,
            });
        }
    },
    getInitialState: function() {
            return {
            name: "",            
            editingStudent: null,            
        }
    },
    componentDidMount: function() {
        UserStore.addEditStudentListener(this._onEdit);
    },
    render: function() {
        var btnAdd = (<input type="button" value="Add" className="btn btn-primary" onClick={this._onClickAdd} />);
        var btnUpdate = (<input type="button" value="Update" className="btn btn-primary" onClick={this._onClickUpdate} />);
        var courses = this.props.listCourse.map(function(course) {
            return (
               <option value={course._id}>{course.name}</option>
            );
        }.bind(this));

        return (
            <div className="row" style={{margin: "10px"}}>
                <div className="col-md-2">
                    Name:
                </div>               
                <div>
                    <input className="form-group col-md-3" ref="name" value={this.state.name} onChange={this._onChangeName} />
                </div>
                 <div className="col-md-2">
                    Course:
                </div> 
                 <div className="col-md-3">
                    <select className="col-md-12" onChange={this._onchangCourse} ref="course" value={this.state.courser}>{courses}</select>
                </div>
                <div className="col-md-2">
                    {this.state.editingStudent ? btnUpdate : btnAdd}
                </div>
            </div>
        );
    }
});

module.exports = StudentForm;