var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	SubjectAPI = require('../API/subject-api');

var SubjectActions = {
	fetchAddSubjectFromServer: function() {		
		SubjectAPI.getSubject({}).then(function(subjects) {			
			AppDispatcher.dispatch({
				action:Contants.GET_SUBJECT,
				data: subjects,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
	},

	create: function(subject) {        
		SubjectAPI.createSubject(subject).then(function(data) {            
			AppDispatcher.dispatch({
				action: Contants.CREATE_SUBJECT,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(subject) {		
		SubjectAPI.updateSubject(subject).then(function(updateData){
			AppDispatcher.dispatch({
				action: Contants.UPDATE_SUBJECT,
				data: updateData,
                subject: subject,
			});
		}, function(status,text){
			// handle err
		});
	},
	editSubject: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_EDIT,
	        data: index,
	    })
    },
	destroy: function(id) {       
		SubjectAPI.deleteSubject(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_SUBJECT,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	}

};
module.exports = SubjectActions;