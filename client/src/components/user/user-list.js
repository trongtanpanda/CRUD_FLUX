var React = require("react"),
    UserStore = require("../../stores/user-store"),
 UserActions = require("../../actions/user-action");
var UserList = React.createClass({

    render: function() {
        var userList = this.props.users.map(function(user, index) {
            
            return (
                <tr key={index}>
                    <td>{user.name}</td> 
                </tr>
            );
        }.bind(this));

        return (
            <div>
                <table className="table">
                    <tbody>
                        {userList}
                    </tbody>
                </table>
            </div>
        );
    }
});

module.exports = UserList;