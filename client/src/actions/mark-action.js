var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	MarkAPI = require('../API/mark-api');

var MarkActions = {
	fetchAddMarkFromServer: function() {		
		MarkAPI.getAllmark({}).then(function(marks) {			
			AppDispatcher.dispatch({
				action:Contants.GET_MARK,
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
				action: Contants.CREATE_MARK,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(mark) {		
		MarkAPI.updateMark(mark).then(function(updateData){
			AppDispatcher.dispatch({
				action: Contants.UPDATE_MARK,
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
				action: Contants.DELETE_MARK,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	},
	deleteMark: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_DELETE,
	        data: index,
	    })
    },
    getStudentByTermClass: function(index){    	
    	MarkAPI.getStudentByTermClass(index).then(function(data) {	    		
			AppDispatcher.dispatch({
				action:Contants.GET_LISTBYTERM,
				data: data,
				index: index,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
    },
    addStudentToTermClass: function(student, termClass){
    	MarkAPI.addStudentToTermClass(student,termClass).then(function(data){
    		console.log(data);
    	AppDispatcher.dispatch({
				action:Contants.ADD_STUDENT_TO_TERMCLASS,
				data: data,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
    },

};
module.exports = MarkActions;