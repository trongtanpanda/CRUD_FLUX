var React = require("react");

var Message = React.createClass({
    render: function() {
        var message = this.props.messages.map(function(me) {
            return (
               <td>asdas</td>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>
                        {message}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = Message;