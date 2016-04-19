var React = require("react"),    
    CourseStore = require("../../stores/course-store"),
    CourseActions = require("../../actions/course-action.js");

var CourseForm = React.createClass({
    
    _onClickAdd: function() {
         var course = {
            course_id: this.state.course_id,
            name: this.state.name,
            incoming_year: this.state.incoming_year,
            full: this.state.full
        };

        CourseActions.create(course);
        this.setState({
           course_id:"", name: "", incoming_year: "", full: ""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onClickUpdate: function() {
        var editingCourse = this.state.editingCourse;        
        var user ={
            _id:editingCourse._id,
            course_id: this.state.course_id,
            name: this.state.name,
            incoming_year: this.state.incoming_year,
            full: this.state.full
        };
        CourseActions.update(user);
        this.setState({
            course_id:"", name: "", incoming_year: "", full: ""
        });
         $("#close").click();
         this._onclickClose;
    },
    _onchangId: function(e){        
        this.setState({
            course_id: e.target.value,
        });
    },
    _onchangname: function(e) {
        this.setState({
            name: e.target.value, 
        });
    },
    _onchangincoming_year: function(e) {
        this.setState({
            incoming_year: e.target.value, 
        });
    },
    _onchangfull: function(e) {
        this.setState({
            full: e.target.value, 
        });
    },
    _onEdit: function() {  
        var editingCourse = CourseStore.getEditingCourses();
        this.setState({
            editingCourse: editingCourse,
        });

        if (editingCourse) {
            this.setState({
                course_id: editingCourse.course_id,
                name: editingCourse.name,
                incoming_year: editingCourse.incoming_year,
                full: editingCourse.full,
            });
        }
    },
    _onclickClose: function(){       
        this.setState({                        
            course_id: "",
            name: "",
            incoming_year:"",
            full: "",           
            editingCourse: "",                  
        });
    },
    getInitialState: function() {
            return {
            course_id: "", first: "", incoming_year: "", full: "",            
            editingCourse: null,            
        }
    },
    componentDidMount: function() {
        CourseStore.addEditCourseListener(this._onEdit);
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
                                <input id="title" value={this.state.course_id} onChange={this._onchangId} ref="course_id" className="form-control" type="text" placeholder="Mã khoa" ref="title" name="title"/>
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
                                <input id="title" value={this.state.incoming_year} onChange={this._onchangincoming_year} ref="incoming_year" className="form-control" type="text" placeholder="Trưởng khoa" ref="title" name="title"/>
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="title" className="col-sm-2 control-label">Tên</label>
                            <div className="col-sm-10">
                                <input id="title" value={this.state.full} onChange={this._onchangfull} ref="full" className="form-control" type="text" placeholder="Giáo vụ" ref="title" name="title"/>
                            </div>
                        </div>                      
                    </form>                    
                  </div>
                  <div className="modal-footer">
                    <button type="button" id="close" onClick={this._onclickClose} className="btn btn-default" data-dismiss="modal">Đóng</button>
                     {this.state.editingCourse ? btnUpdate : btnAdd}
                  </div>
                </div>
              </div>
            </div>             
            
        </div>
        );
    }
});

module.exports = CourseForm;