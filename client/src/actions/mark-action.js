var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	MarkAPI = require('../API/mark-api');

var MarkActions = {
	fetchAddMarkFromServer: function() {		
		MarkAPI.getAllmark({}).then(function(marks) {			
			AppDispatcher.dispatch({
				action:Contants.GET_Mark,
				data: marks,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
	},

	create: function(mark) {        
		MarkAPI.createMark(mark).then(function(data) {            
			AppDispatcher.dispatch({
				action: Contants.CREATE_Mark,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(mark) {		
		MarkAPI.updateMark(Mark).then(function(updateData){
			AppDispatcher.dispatch({
				action: Contants.UPDATE_Mark,
				data: updateData,
                mark: mark,
			});
		}, function(status,text){
			// handle err
		});
	},
	editMark: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_EDIT,
	        data: index,
	    })
    },
	destroy: function(id) {       
		MarkAPI.deleteMark(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_Mark,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	}

};
module.exports = MarkActions;