var _ = require("underscore"),
    StudentConstants = require("../constants/student-constants"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENT = 'change_edit';

var __termClass = [];
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
    __termClass.push(student);
}
function _listTermClass(data){
    __termClass= data;
}

function _removeStudent(_id) {    
    var i = ByKeyValue(__termClass, "_id", _id);
        __termClass.splice(i,1);
}

function _editStudent(index) {
    _editing_id = index;
}

function _updateStudent(student) {
    var index = ByKeyValue(__termClass, "_id", _editing_id); 
    __termClass[index] = student;
    _editing_id = null;
}
function _getMsg(message){
    _msg=message;    
}
function _deleteMsg(){
    _msg =null;
}
var TermClassStore  = _.extend(BaseStore, {
    getTermClass: function() {       
        return __termClass;
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
        var index = ByKeyValue(__termClass, "_id", _editing_id);
        return __termClass[index];        
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
       

        case StudentConstants.GET_TERM_CLASS:
            _listTermClass(payload.data);
            TermClassStore.emitChange();
            break;
            
    
    }
});
module.exports = TermClassStore;