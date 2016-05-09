var React = require("react"),    
    StudentStore = require("../../stores/student-store"),
    StudentForm = require("./student-form"),
    StudentActions = require("../../actions/student-action.js");
var URL = 'http://developer.echonest.com/api/v4/song/search?api_key=JE2S42FJUGYGJFVSE';
var Paginator = require("../Paginator.js");
var PER_PAGE = 10;

var ImportExcel = React.createClass({    
    // componentDidMount: function() {
    //     this.onChangePage(1);
    // },
   
    getInitialState: function() {
        return {
            items: [],
            student_id: "", first: "", midname: "", lastname: "",            
            editingStudent: null,
            loading: true
        };
    },
   
    renderItem: function(item) {
        return <li key={item.id}>{item.title}</li>;
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
    save: function(){
        StudentActions.saveExcel(this.state.dataEx);
        
    },

    _onchangeSheet: function(e) {
       
        var ex =this.state.data[e.target.value];
        this.setState({
            sheetName: e.target.value,
            dataEx: ex,
        });
        this.onChangePage(1,ex);
    },
     onChangePage: function(page,dataEx) {
        if(this.state.dataEx){
            this.setState({
                loading: true,
                items: this.getData(page,this.state.dataEx),
            });
        }else{
            this.setState({
                loading: true,
                items: this.getData(page,dataEx),
            });
        }       
        
    },
     getData: function(page,dataEx) {
        var list= [];
        var start =PER_PAGE *(page-1);
        console.log(dataEx.length);
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
        var id = item['Mã sv'];
        var firstname = item['Họ '];
        var lastname = item['Tên'];
        var gender;

        if(item['Giới tính']=="1" || item['Giới tính']==1){
            gender ="Nam";
        }else{
            gender = "Nữ";
        }
        var native = item['Quê Quán'];
        var classed = item['Lớp SH'];
        var day = item['Ngày'];
        var month = item['Tháng'];
        var year = item['Năm'];
        return <tr><td>{id}</td><td>{firstname}</td><td>{lastname}</td><td>{gender}</td><td>{native}</td><td>{classed}</td> </tr>;
    },
    render: function() {
        var listStudent =[];
        var sheetList = [<option>Chọn sheet</option>];
        if(this.state.sheetName){
            var total=Math.ceil(this.state.dataEx.length/PER_PAGE);
            console.log(total);
            listStudent.push(<div>
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
                        {this.state.items.map(this.renderItem)}
                    </tbody>
                </table>                 
                <Paginator max={total} onChange={this.onChangePage} />
                
            </div>);
        };
        if(this.state.sheets){
            for(var i =0; i< this.state.sheets.length; i++){
                sheetList.push(<option value={this.state.sheets[i]}>{this.state.sheets[i]}</option>);
            }
       };
        
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
                        <select onChange={this._onchangeSheet} className="form-control col s3">                        
                          {sheetList}
                        </select>
                            
                        </div>
                       {listStudent}
                    </div>
                  <div className="modal-footer">
                    <button type="button" id="close" className="btn btn-default" data-dismiss="modal">Đóng</button>
                    <button type="button" onClick={this.save}  className="btn btn-primary">Lưu</button>
                  </div>
                </div>
              </div>
            </div>             
            
        </div>
        );
    }
});

module.exports = ImportExcel;