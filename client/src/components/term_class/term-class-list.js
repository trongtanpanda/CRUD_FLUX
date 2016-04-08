var React = require("react"),
    TermClassStore = require("../../stores/termclass-store"),
    TermClassActions = require("../../actions/term-class");
var TermClassList = React.createClass({

    render: function() {
        var termClassList = this.props.termClass.map(function(termClass, index) {
           
            return (
                <tr key={index}>
                    <td>{termClass.term_class_id}</td>                    
                    <td>{termClass.name}</td>  
                    <td>{termClass.number}</td>  
                    <td>{termClass.theory}</td>  
                    <td>{termClass.diligence}</td>  
                    <td>{termClass.practive}</td>  
                    <td>{termClass.self_taught}</td>  
                    <td>{termClass.perceive}</td>  
                    <td>{termClass.last_test}</td>  
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>
                        <thead>
                          <tr>
                             <th>Mã Lớp học phần</th>
                             <th>Tên lớp học phần</th>
                             <th>Số tín chỉ</th>
                             <th>Lý thuyết</th>
                             <th>Chuyên cần</th>
                             <th>Thực hành</th>
                             <th>Tự học</th>
                             <th>Nhận thức</th>                            
                             <th>Cuối kỳ</th>
                          </tr>
                        </thead>
                        {termClassList}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = TermClassList;