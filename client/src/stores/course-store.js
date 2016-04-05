var _ = require("underscore"),
    StudentConstants = require("../constants/student-constants.js"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENT = 'change_edit';


var _course= [];

function _addStudent(student) {
    _departments.push(student);
}
function _listDepartment(data){
    _departments= data;
}
function _listCourses(data){
    _course =data;
}

var CourseStore  = _.extend(BaseStore, {
    getCourses: function() {       
        return _course;
    },
   
    getMessage:function(){
        return _msg;
    },
    // emitChange: function() {
    //     this.emit(CHANGE_EVENT);
    // },
    // addChangeListener: function(callback) {
    //     this.on(CHANGE_EVENT, callback);
    // },

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