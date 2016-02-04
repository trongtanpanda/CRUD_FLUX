var _ = require("underscore"),
    StudentConstants = require("../constants/student-constants.jsx"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENT = 'change_edit';

var _students = [];
var _courses= [];
var _editing_id = null;
var _msg;

function ByKeyValue(arraytosearch, key, valuetosearch) { 
    for (var i = 0; i < arraytosearch.length; i++) { 
        if (arraytosearch[i][key] == valuetosearch) {
            return i;
        }
    }
    return null;
}


function _addStudent(student) {
    _students.push(student);
}
function _listStudent(data){
    _students= data;
}
function _listCourse(data){
    _courses =data;
}
function _removeStudent(_id) {    
    var i = ByKeyValue(_students, "_id", _id);
        _students.splice(i,1);
}

function _editStudent(index) {
    _editing_id = index;
}

function _updateStudent(student) {
    var index = ByKeyValue(_students, "_id", _editing_id); 
    _students[index] = student;
    _editing_id = null;
}
function _getMsg(message){
    _msg=message;    
}
function _deleteMsg(){
    _msg =null;
}
var UserStore  = _.extend(BaseStore, {
    getStudents: function() {
        for(var i=0; i<_students.length; i++){
            for (var j = 0; j < _courses.length; j++) {
                if(_students[i].course===_courses[j]._id){
                     _students[i].course = _courses[j];
                }
            };
        };
        return _students;
    },
    getCourses: function(){
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

    getEditingStudent: function() {
        if (!_editing_id) {
            return null;
        }
        var index = ByKeyValue(_students, "_id", _editing_id);
        return _students[index];        
    },
    emitEditStudent: function(callback) {
        this.emit(CHANGE_EDIT_EVENT, callback);
    },
    addEditStudentListener: function(callback) {
        this.on(CHANGE_EDIT_EVENT, callback);
    },
});

AppDispatcher.register(function(payload) {
    switch (payload.action) {
        case StudentConstants.CREATE_STUDENT:
            _getMsg(payload.data.Message);
            _addStudent(payload.data.Message.user);
            UserStore.emitChange();            
            break;

        case StudentConstants.DELETE_STUDENT:
            _removeStudent(payload.data.Message.studentId);
            _getMsg(payload.data.Message);                    
            UserStore.emitChange();           
            break;

        case StudentConstants.ACTION_EDIT:
            _editStudent(payload.data);
            UserStore.emitEditStudent();
            break;

        case StudentConstants.UPDATE_STUDENT:
            _updateStudent(payload.user);
            _getMsg(payload.data.Message);            
            UserStore.emitEditStudent();
            UserStore.emitChange();            
            break;

        case StudentConstants.GET_STUDENT:
            _listStudent(payload.data);
            UserStore.emitChange();
            break;
            
        case StudentConstants.GET_COURSE:
            _listCourse(payload.data);            
            UserStore.emitChange();
            break;
    }
});
module.exports = UserStore;