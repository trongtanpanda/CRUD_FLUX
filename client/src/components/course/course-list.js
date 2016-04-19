var React = require("react"),
    CourseStore = require("../../stores/course-store"),
    CourseActions = require("../../actions/course-action.js");
var Confirm = require('react-confirm-bootstrap');
var CourseList = React.createClass({
     _onDelete: function() {        
        var deletingCourse = CourseStore.getDeleteCourse();
        // console.log(editingCourse);
        this.setState({
            deletingCourse: deletingCourse,
        });

        if (deletingCourse) {
            this.setState({
                name: deletingCourse.name,
                _id: deletingCourse._id,
            });
        }
    },
    getInitialState: function() {
            return {
            name: "",            
            deletingCourse: null, 
            id: null,           
        }
    },
    componentDidMount: function() {
        CourseStore.addDeleteCourseListener(this._onDelete);
    },
    render: function() {
        var courseList = this.props.courses.map(function(course, index) {
          
            return (
                <tr key={index}>
                    <td>{course.course_id}</td> 
                    <td>{course.name}</td>                                     
                    <td>{course.incoming_year}</td>
                    <td>{course.full}</td>                  
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#myModal" value="Edit" className="btn btn-success" onClick={CourseActions.editCourse.bind(null,course._id)} /></td>
                    <td className="col-md-1"><input type="button" data-toggle="modal" data-target="#deleModal" value="delete" className="btn btn-danger" onClick={CourseActions.deleteCourse.bind(null,course._id)} /></td>
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>
                        
                        {courseList}
                    </tbody>
                </table>
                   <div className="modal fade" id="deleModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" >
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button"  className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4 className="modal-title" id="myModalLabel">Thêm khoa mới</h4>
                  </div>
                  <div className="modal-body">
                   {this.state.name}
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal">Đóng</button>
                    <button type="button" id="close"  className="btn btn-default" data-dismiss="modal" onClick={CourseActions.destroy.bind(null,this.state._id)}>DELETE</button>

                  </div>
                </div>
              </div>
            </div>
            </div>
        );
    }
});

module.exports = CourseList;