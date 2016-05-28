var React = require("react"); 
var Login = React.createClass({
	 getInitialState: function() {
            return {
            user: "",            
            pass: "", 
           	err: "",          
        }
    },
    onsubmit: function(){
    	if((this.state.user=="admin") && (this.state.pass =="admin")){    		
    		window.location.assign("http://localhost:8080/#/home")
    		this.setState({
    			err: ""
    		});
    	}else{
    		this.setState({
    			err: "Tên đăng nhập hoặc mật khâu không đúng!"
    		});
    	}
    },
    onChangeUser: function(e){
		this.setState({
    		user: e.target.value,
    	});
    },
    onChangePass: function(e){
    	this.setState({
    		pass: e.target.value,
    	});

    },
  render: function() {
  	var msg;
  	if(this.state.err){
  		msg = (<p className="err-msg">{this.state.err}</p>);
  	}
        return (<div className="form-box">
			    <div className="head">Đăng nhập</div>        
			    <form action="#" id="login-form">
			        <div className="form-group">
			          <label className="label-control">
			            <span className="label-text">Tên đăng nhập</span>
			          </label>
			          <input type="email" name="email" value={this.state.user} onChange={this.onChangeUser} className="form-control" />
			        </div>
			        <div className="form-group">
			          <label className="label-control">
			            <span className="label-text">Mật khẩu</span>
			          </label> 
			          <input type="password" value={this.state.pass} onChange={this.onChangePass} name="password" className="form-control" />
			        </div>
			        {msg}
			        <input type="button" value="Đăng nhập" onClick={this.onsubmit} className="btn-login" />			        
			    </form>
			    
			 </div>

    	);
    }

});	
module.exports = Login;