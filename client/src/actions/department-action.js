var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	DepartmentAPI = require('../API/department-api');

var DepartmentActions = {
	fetchAddDepartmentFromServer: function() {
		DepartmentAPI.getAllDepartment({}).then(function(departments) {	
			AppDispatcher.dispatch({
				action:Contants.GET_DEPARTMENT,
				data: departments,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
	},

	create: function(department) { 
		console.log('action',department);
		DepartmentAPI.createDepartment(department).then(function(data) { 
			AppDispatcher.dispatch({
				action: Contants.CREATE_DEPARTMENT,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(department) {	
		DepartmentAPI.updateDepartment(department).then(function(updateData){
			AppDispatcher.dispatch({
				action: Contants.UPDATE_DEPARTMENT,
				data: updateData,
                department: department,
			});
		}, function(status,text){
			// handle err
		});
	},
	editDepartment: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_EDIT,
	        data: index,
	    })
    },
	destroy: function(id) {
		DepartmentAPI.deleteDepartment(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_DEPARTMENT,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	},
	deleteDepartment: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_DELETE,
	        data: index,
	    })
    },

};
module.exports = DepartmentActions;