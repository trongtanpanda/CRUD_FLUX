var React = require("react"),
    UserStore = require("../../stores/user-store"),
    StudentActions = require("../../actions/student-action.js");
var MarkList = React.createClass({

    render: function() {
        var markList = this.props.marks.map(function(mark, index) {
           
            return (
                <tr key={index}>

                    <td>{mark.student.lastname} {mark.student.midname} {mark.student.firstname}</td>                    
                    <td>{mark.term_class.name}</td>
                    <td>{mark.cc}</td>
                    <td>{mark.gk}</td>                    
                    <td>{mark.tbkt}</td>
                    <td>{mark.t1}</td>
                    <td>{mark.tkml1}</td>
                    <td>{mark.t2}</td>
                    <td>{mark.tkml2}</td>
                    <td>{mark.t3}</td>
                    <td>{mark.by_text}</td>
                    <td>{mark.by_number}</td>

                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>
                    <thead>
                          <tr>
                             <th>Sinh viên</th>
                             <th>Lớp học phần</th>
                             <th>Cuối kỳ</th>
                             <th>Giữa kỳ</th>
                             <th>tbkt</th>
                             <th>t1</th>
                             <th>tkml1</th>
                             <th>t2</th>
                             <th>tkml2</th>
                             <th>t3</th>
                             <th>by_text</th>
                             <th>by_number</th>
                          </tr>
                        </thead>
                        {markList}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = MarkList;