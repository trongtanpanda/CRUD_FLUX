var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	CourseAPI = require('../API/course-api.js');

var CourseActions = {
	fetchAddCourseFromServer: function() {		
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
		CourseAPI.createCourse(course).then(function(data) {  		         
			AppDispatcher.dispatch({
				action: Contants.CREATE_COURSE,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(course) {
		CourseAPI.updateCourse(course).then(function(data){
			// console.log(data); 
			AppDispatcher.dispatch({
				action: Contants.UPDATE_COURSESS,
				data: data
			});
		}, function(status,text){
			// handle err
		});
	},
	editCourse: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_EDIT_COURSE,
	        data: index,
	    })
    },
	destroy: function(id) {       
		CourseAPI.deleteCourse(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_COURSES,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	},
	deleteCourse: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_DELETE_COURSE,
	        data: index,
	    })
    },

};
module.exports = CourseActions;