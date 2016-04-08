var React = require("react"),
    UserActions = require("../actions/user-action"),   
    UserStore = require("../stores/user-store"),    
    UserList = require("./user/user-list");
    // Message = require("./message");



var User = React.createClass({

    componentWillMount: function() {
        this.setState({
            users: UserStore.getUsers()
            
        });
        
    },
    _onChange: function() {

        this.setState({
            users: UserStore.getUsers(),
            
        });        
               
    },
    getInitialState: function() {
        UserActions.fetchAddUserFromServer();        
        return {
            users: UserStore.getUsers(),
            
        }
         this.setState({
            users: UserStore.getUsers()
            
        });
    },
    componentDidMount: function() {
        UserStore.addChangeListener(this._onChange);             
        
    },
    render: function() { 
       
        return (
            
            <div>
                <h1 className="text-center">Quản lý người dùng</h1>
                    <div className="col-md-10 col-md-offset-1"> 
                        <UserList users={this.state.users} />
                </div>

            </div>
            
        );
    }
});

module.exports = User;