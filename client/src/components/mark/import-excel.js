var React = require("react"),    
    MarkStore = require("../../stores/mark-store"),
    MarkForm = require("./mark-form"),
    TermClassAction = require("../../actions/termclass-action"),
    MarkActions = require("../../actions/mark-action.js");
var Paginator = require("./Paginator.js");
var PER_PAGE = 10;

var ImportExcel = React.createClass({    
    // componentDidMount: function() {
    //     this.onChangePage(1);
    // },
   
    getInitialState: function() {
        return {
            items: [],
            mark_id: "", first: "", midname: "", lastname: "",            
            editingMark: null,
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
        MarkActions.saveExcel(this.state.dataEx);
        
    },

    _onchangeSheet: function(e) {
        TermClassAction(e.target.value);
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
        var id = item['MÃ SỐ'];
        var firstname = item['HỌ - HỌ ĐỆM'];
        var lastname = item['TÊN'];      
        var cc = item['C.cần'];
        var gk = item['G.kỳ'];
        var tb = item['TB KT'];
        var test1 = item['Thi 1'];
        var word = item['Đ.CHỮ'];
        var number = item['Đ.SỐ'];
        return <tr><td>{id}</td><td>{firstname}</td><td>{lastname}</td><td>{cc}</td><td>{gk}</td><td>{tb}</td><td>{test1}</td><td>{word}</td><td>{number}</td> </tr>;
    },
    render: function() {
        var listMark =[];
        var sheetList = [<option>Chọn sheet</option>];
        if(this.state.sheetName){
            var total=Math.ceil(this.state.dataEx.length/PER_PAGE);
            console.log(total);
            listMark.push(<div>
                 <table className="table">
                    <thead>
                        <tr>
                            <th>Mã SV</th>
                            <th>Họ</th>
                            <th>Tên</th>
                            <th>Chuyên cần</th>
                            <th>giữa kỳ</th>
                            <th>TB KT</th>
                            <th>Thi lần 1</th>
                            <th>Đ. Chữ</th>
                            <th>D. Số</th>

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
                       {listMark}
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