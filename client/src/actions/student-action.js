var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	StudentAPI = require('../API/student-api');

var StudentActions = {
	fetchAddStudentFromServer: function() {		
		StudentAPI.getStudent({}).then(function(students) {			
			AppDispatcher.dispatch({
				action:Contants.GET_STUDENT,
				data: students,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
	},

	create: function(student) {		
		StudentAPI.createStudent(student).then(function(data) {  
			AppDispatcher.dispatch({
				action: Contants.CREATE_STUDENT,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(student) {	
		StudentAPI.updateStudent(student).then(function(updateData){
			AppDispatcher.dispatch({
				action: Contants.UPDATE_STUDENT,
				data: updateData,
                user: student,
			});
		}, function(status,text){
			// handle err
		});
	},
	editStudent: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_EDIT,
	        data: index,
	    })
    },
	destroy: function(id) {       
		StudentAPI.deleteStudent(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_STUDENT,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	},
	deleteStudent: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_DELETE,
	        data: index,
	    })
    },    
    importExcel: function(data){
    	AppDispatcher.dispatch({
	        action: Contants.IMPORT_EXCEL,
	        data: data,
	    })
    },
    saveExcel: function(list){    	
    	StudentAPI.saveExcel(list).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.SAVE_EXCEL,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
    },
};
module.exports = StudentActions;