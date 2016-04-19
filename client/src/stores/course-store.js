var _ = require("underscore"),
    CourseConstants = require("../constants/student-constants.js"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENTS = 'change_edit';
var CHANGE_DELETE_EVENTS = 'change_delete';
var _courses= [];
var _editing_id = null;
var _deleting_id = null;
var _msg;

function ByKeyValue(arraytosearch, key, valuetosearch) { 
    for (var i = 0; i < arraytosearch.length; i++) { 
        if (arraytosearch[i][key] == valuetosearch) {
            return i;
        }
    }
    return null;
}


function _addCourse(course) {
    _courses.push(course);
}
function _listCourse(data){
    _courses= data;
}

function _removeCourse(_id) {    
    var i = ByKeyValue(_courses, "_id", _id);
        _courses.splice(i,1);
}

function _editCourse(index) {
    _editing_id = index;
}

function _deleteCourse(index) {
    _deleting_id = index;
}

function _updateCourse(course) {
    var index = ByKeyValue(_courses, "_id", _editing_id); 
    _courses[index] = course;
    _editing_id = null;
}

function _getMsg(message){
    _msg=message;    
}
function _deleteMsg(){
    _msg =null;
}
var CourseStore  = _.extend(BaseStore, {
    getCourse: function() { 
        // console.log("this is in store");
        return _courses;
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

    getEditingCourses: function() {
        if (!_editing_id) {

            return null;
        }
        var index = ByKeyValue(_courses, "_id", _editing_id);

        return _courses[index];        
    },
    emitEditCourse: function(callback) {
        this.emit(CHANGE_EDIT_EVENTS, callback);
    },
    addEditCourseListener: function(callback) {
        this.on(CHANGE_EDIT_EVENTS, callback);
    },

    getDeleteCourse: function() {
        if (!_deleting_id) {
            return null;
        }
        var index = ByKeyValue(_courses, "_id", _deleting_id);
        return _courses[index];        
    },
    emitDeleteCourse: function(callback) {
        this.emit(CHANGE_DELETE_EVENTS, callback);
    },
    addDeleteCourseListener: function(callback) {
        this.on(CHANGE_DELETE_EVENTS, callback);
    },
});

AppDispatcher.register(function(payload) {
    switch (payload.action) {
        case CourseConstants.CREATE_COURSE:           
            _addCourse(payload.data.course);
            CourseStore.emitChange();            
            break;

        case CourseConstants.DELETE_COURSES:
        console.log("this is update");
            // console.log(payload.data.Message.course);
            _removeCourse(payload.data.Message.course);
            _getMsg(payload.data.Message);                    
            CourseStore.emitChange();           
            break;

        case CourseConstants.ACTION_EDIT_COURSE:
            _editCourse(payload.data);
            CourseStore.emitEditCourse();
            break;

        case CourseConstants.ACTION_DELETE_COURSE:
            _deleteCourse(payload.data);
            CourseStore.emitDeleteCourse();
            break;

        case CourseConstants.UPDATE_COURSESS:
        console.log("this is update");
            _updateCourse(payload.data.Message.course);
            // _getMsg(payload.data.Message);            
            CourseStore.emitEditCourse();
            CourseStore.emitChange();            
            break;

        case CourseConstants.GET_COURSE:
            // console.log(payload.data);
            _listCourse(payload.data);
            CourseStore.emitChange();
            break;            
       
    }
});
module.exports = CourseStore;