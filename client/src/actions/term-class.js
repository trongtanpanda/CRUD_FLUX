var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	TermClassAPI = require('../API/termclass-api');

var Term_classActions = {
	fetchAddTerm_classFromServer: function() {		
		TermClassAPI.getAllTerm_Class({}).then(function(term_class) {			
			AppDispatcher.dispatch({
				action:Contants.GET_TERMCLASS,
				data: term_class,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
	},

	create: function(term_class) {        
		TermClassAPI.createTerm_class(term_class).then(function(data) {            
			AppDispatcher.dispatch({
				action: Contants.CREATE_TERMCLASS,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(term_class) {		
		TermClassAPI.updateTerm_class(term_class).then(function(updateData){
			AppDispatcher.dispatch({
				action: Contants.UPDATE_TERMCLASS,
				data: updateData,
                term_class: term_class,
			});
		}, function(status,text){
			// handle err
		});
	},
	editTerm_class: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_EDIT,
	        data: index,
	    })
    },
	destroy: function(id) {       
		TermClassAPI.deleteTerm_class(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_TERMCLASS,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	}

};
module.exports = Term_classActions;