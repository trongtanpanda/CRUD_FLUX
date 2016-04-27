var React = require("react"),    
    StudentStore = require("../../stores/student-store"),
    StudentForm = require("./student-form"),
    StudentActions = require("../../actions/student-action.js");


var ImportExcel = React.createClass({
    
    // _onClickAdd: function() {
    //      var student = {
    //         student_id: this.state.student_id,
    //         firstname: this.state.firstname,
    //         midname: this.state.midname,
    //         lastname: this.state.lastname
    //     };

    //     StudentActions.create(student);
    //     this.setState({
    //        student_id:"", firstname: "", midname: "", lastname: ""
    //     });
    //      $("#close").click();
    //      this._onclickClose;
    // },
    // _onClickUpdate: function() {
    //     var editingStudent = this.state.editingStudent;        
    //     var user ={
    //         _id:editingStudent._id,
    //         student_id: this.state.student_id,
    //         firstname: this.state.firstname,
    //         midname: this.state.midname,
    //         lastname: this.state.lastname
    //     };
    //     StudentActions.update(user);
    //     this.setState({
    //         student_id:"", firstname: "", midname: "", lastname: ""
    //     });
    //      $("#close").click();
    //      this._onclickClose;
    // },
    // _onchangId: function(e){        
    //     this.setState({
    //         student_id: e.target.value,
    //     });
    // },
    // _onchangFirstname: function(e) {
    //     this.setState({
    //         firstname: e.target.value, 
    //     });
    // },
    // _onchangMidname: function(e) {
    //     this.setState({
    //         midname: e.target.value, 
    //     });
    // },
    // _onchangLastname: function(e) {
    //     this.setState({
    //         lastname: e.target.value, 
    //     });
    // },
    // _onEdit: function() {  
    //     var editingStudent = StudentStore.getEditingStudents();
    //     this.setState({
    //         editingStudent: editingStudent,
    //     });

    //     if (editingStudent) {
    //         this.setState({
    //             student_id: editingStudent.student_id,
    //             firstname: editingStudent.firstname,
    //             midname: editingStudent.midname,
    //             lastname: editingStudent.lastname,
    //         });
    //     }
    // },
    // _onclickClose: function(){       
    //     this.setState({                        
    //         student_id: "",
    //         firstname: "",
    //         midname:"",
    //         lastname: "",           
    //         editingStudent: "",                  
    //     });
    // },
    getInitialState: function() {
            return {
            student_id: "", first: "", midname: "", lastname: "",            
            editingStudent: null,            
        }
    },
    _upload: function(e){
        var files = e.target.files;
        var f = files[0];
        var dataExcel; 
        var sheets;      
        var that = this;
            var reader = new FileReader();
            var name = f.name;
            reader.onload = function(e) {                
                var data = e.target.result;  
                var wb = X.read(data, {type: 'binary'}); 
                dataExcel = process_wb(wb);
                sheets = Object.keys(dataExcel); 
                that.setState({                        
                    data: dataExcel,
                    sheets: sheets,
                });                                       
            };
            reader.readAsBinaryString(f);
    },
    _onchangeSheet: function(e) {
        this.setState({
            sheetName: e.target.value, 
        });
    },
    // componentDidMount: function() {
    //     StudentStore.addEditStudentListener(this._onEdit);
    // },
    render: function() {
        var listStudent =[];
        var sheetList = [<option>Chọn sheet</option>];
        if(this.state.sheetName){
            var field = "Mã sv";          
            var list = this.state.data[this.state.sheetName];            
            for(var i=0; i<list.length; i++){
               var object_student = list[i];
                var id = (object_student['Mã sv']);
                var firstname = (object_student['Họ']);
                var lastname = (object_student['Tên']);
                var gender;

                if(object_student['Giới tính']=="1" || object_student['Giới tính']==1){
                    gender ="Nam";
                }else{
                    gender = "Nữ";
                }
                var native = (object_student['Quê Quán']);
                var classed = (object_student['Lớp SH']);
                var day = (object_student['Ngày']);
                var month = (object_student['Tháng']);
                var year = (object_student['Năm']);
                listStudent.push(<tr><td>{id}</td><td>{firstname}</td><td>{lastname}</td><td>{gender}</td><td>{native}</td><td>{classed}</td> </tr>);
            }
        };
        if(this.state.sheets){
            for(var i =0; i< this.state.sheets.length; i++){
                sheetList.push(<option value={this.state.sheets[i]}>{this.state.sheets[i]}</option>);
            }
       };
        var btnAdd = ( <button type="button"  className="btn btn-primary">Lưu</button>);
        var btnUpdate = (<button type="button"  className="btn btn-primary">Update</button>);

        return (
        <div>
                    
           <p>&nbsp;</p>              
            <div className="modal fade" id="ecelModal" tabIndex="-1" role="dialog"  aria-labelledby="myModalLabel" aria-hidden="true">
              <div className="modal-dialog" >
                <div className="modal-content" >
                  <div className="modal-header">
                    <button type="button"  className="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span className="sr-only">Close</span></button>
                    <h4 className="modal-title" id="myModalLabel">Thêm Sinh Viên mới</h4>
                  </div>
                    <div className="modal-body">
                    <div className="row">
                        <p><input type="file" name="xlfile" onChange={this._upload} id="xlf" /></p>
                        <p className="col-md-5">
                            <select onChange={this._onchangeSheet} className="form-control">                        
                              {sheetList}
                            </select>
                            </p>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Mã SV</th>
                                    <th>Họ</th>
                                    <th>Tên</th>
                                    <th>Giới tính</th>
                                    <th>Quê quán</th>
                                    <th>Lớp</th>
                                </tr>
                            </thead>
                            <tbody>
                            {listStudent}
                            </tbody>
                        </table>   
                    </div>
                  <div className="modal-footer">
                    <button type="button" id="close" className="btn btn-default" data-dismiss="modal">Đóng</button>
                     {this.state.editingStudent ? btnUpdate : btnAdd}
                  </div>
                </div>
              </div>
            </div>             
            
        </div>
        );
    }
});

module.exports = ImportExcel;