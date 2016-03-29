var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	Term_classAPI = require('../API/term_class-api');

var Term_classActions = {
	fetchAddTerm_classFromServer: function() {		
		Term_classAPI.getTerm_class({}).then(function(term_class) {			
			AppDispatcher.dispatch({
				action:Contants.GET_TERM_CLASS,
				data: term_class,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
	},

	create: function(term_class) {        
		Term_classAPI.createTerm_class(term_class).then(function(data) {            
			AppDispatcher.dispatch({
				action: Contants.CREATE_TERM_CLASS,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(term_class) {		
		Term_classAPI.updateTerm_class(term_class).then(function(updateData){
			AppDispatcher.dispatch({
				action: Contants.UPDATE_TERM_CLASS,
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
		Term_classAPI.deleteTerm_class(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_TERM_CLASS,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	}

};
module.exports = Term_classActions;