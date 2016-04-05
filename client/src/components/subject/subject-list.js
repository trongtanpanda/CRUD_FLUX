var React = require("react"),
    SubjectStore = require("../../stores/subject-store"),
    SubjectActions = require("../../actions/subject-action.js");
var SubjectList = React.createClass({

    render: function() {

        var subjectList = this.props.subjects.map(function(subject, index) {
            return (

                <tr key={index}>
                    <td>{subject.subject_id}</td>                    
                    <td>{subject.name}</td> 
                    <td>{subject.short_name}</td> 
                    <td>{subject.number}</td> 
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>
                        <thead>
                          <tr>
                             <th>Mã Môn học</th>
                             <th>Tên môn học</th>
                             <th>Tên rút gọn</th>
                             <th>Số tín chỉ</th>
                          </tr>
                        </thead>                        
                            {subjectList}                        
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = SubjectList;