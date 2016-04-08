var _ = require("underscore"),
    StudentConstants = require("../constants/student-constants.js"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENT = 'change_edit';


var _courses = [];



function _listCourses(data){ 
       
    _courses =data;
    console.log('after',_courses);
}

var CourseStore  = _.extend(BaseStore, {
    getCourses: function() {
       
        return _courses;
    },
   
  

});

AppDispatcher.register(function(payload) {
    switch (payload.action) {
        
        case StudentConstants.GET_COURSE:                    
            _listCourses(payload.data);
            CourseStore.emitChange();
            break;
            
        
    }
});
module.exports = CourseStore;