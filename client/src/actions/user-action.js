var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	UserAPI = require('../API/user-api');

var UserActions = {
	fetchAddUserFromServer: function() {		
		UserAPI.getAllUser({}).then(function(user) {			
			AppDispatcher.dispatch({
				action:Contants.GET_USER,
				data: user,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
	},

	create: function(user) {        
		UserAPI.createUser(user).then(function(data) {            
			AppDispatcher.dispatch({
				action: Contants.CREATE_USER,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(user) {		
		UserAPI.updateUser(user).then(function(updateData){
			AppDispatcher.dispatch({
				action: Contants.UPDATE_USER,
				data: updateData,
                user: user,
			});
		}, function(status,text){
			// handle err
		});
	},
	editUser: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_EDIT,
	        data: index,
	    })
    },
	destroy: function(id) {       
		UserAPI.deleteUser(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_USER,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	}

};
module.exports = UserActions;