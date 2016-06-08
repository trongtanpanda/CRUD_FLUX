var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	TermClassAPI = require('../API/termclass-api');

var TermClassActions = {
	fetchAddTermClassFromServer: function() {		
		TermClassAPI.getAllTermClass({}).then(function(termClass) {			
			AppDispatcher.dispatch({
				action:Contants.GET_TERMCLASS,
				data: termClass,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
	},

	create: function(termClass) { 
		console.log(termClass);       
		TermClassAPI.createTermClass(termClass).then(function(data) {            
			AppDispatcher.dispatch({
				action: Contants.CREATE_TERMCLASS,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(termClass) {
		TermClassAPI.updateTermClass(termClass).then(function(updateData){
			AppDispatcher.dispatch({
				action: Contants.UPDATE_TERMCLASS,
				data: updateData,
                termClass: termClass,
			});
		}, function(status,text){
			// handle err
		});
	},
	editTermClass: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_EDIT,
	        data: index,
	    })
    },
	destroy: function(id) {       
		TermClassAPI.deleteTermClass(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_TERMCLASS,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	},
	deleteTermClass: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_DELETE,
	        data: index,
	    })
    },
    getTermByName: function(text) {
    	TermClassAPI.getTermByName(text).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.GET_TERM_BY_NAME,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
    },

};
module.exports = TermClassActions;