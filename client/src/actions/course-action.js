var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.jsx'),
	CourseAPI = require('../API/course-api.js');

var CourseActions = {
	getListCourse: function() {		
		CourseAPI.getCourse({}).then(function(courses) {			
			AppDispatcher.dispatch({
				action:Contants.GET_COURSE,
				data: courses,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
	},

	create: function(course) {        
		CoursetAPI.createCourse(course).then(function(data) {            
			AppDispatcher.dispatch({
				action: Contants.CREATE_COURSE,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(course) {		
		CoursetAPI.updateCourse(Course).then(function(updateData){
			AppDispatcher.dispatch({
				action: Contants.UPDATE_COURSE,
				data: updateData,
                course: course,
			});
		}, function(status,text){
			// handle err
		});
	},
	editCourse: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_EDIT,
	        data: index,
	    })
    },
	destroy: function(id) {       
		CoursetAPI.deleteCourse(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_COURSE,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	}

};
module.exports = CourseActions;