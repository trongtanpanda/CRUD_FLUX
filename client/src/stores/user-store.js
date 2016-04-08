var _ = require("underscore"),
    StudentConstants = require("../constants/student-constants.js"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENT = 'change_edit';

var _users = [];
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
function _listUser(data){
    _users= data;
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
    getUsers: function() {
       
        return _users;
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

        case StudentConstants.GET_USER:
            _listUser(payload.data);
            UserStore.emitChange();
            break;
            
        
    }
});
module.exports = UserStore;