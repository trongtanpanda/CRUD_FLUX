var _ = require("underscore"),
    SubjectConstants = require("../constants/student-constants.js"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENT = 'change_edit';
var CHANGE_DELETE_EVENT = 'change_delete';
var _subjects = [];
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


function _addSubject(subject) {
    _subjects.push(subject);
}
function _listSubject(data){
    _subjects= data;
}
function _listCourse(data){
    _courses =data;
}
function _removeSubject(_id) {    
    var i = ByKeyValue(_subjects, "_id", _id);
        _subjects.splice(i,1);
}

function _editSubject(index) {
    _editing_id = index;
}

function _deleteSubject(index) {
    _deleting_id = index;
}

function _updateSubject(subject) {
    var index = ByKeyValue(_subjects, "_id", _editing_id); 
    _subjects[index] = subject;
    _editing_id = null;
}

function _getMsg(message){
    _msg=message;    
}
function _deleteMsg(){
    _msg =null;
}
var SubjectStore  = _.extend(BaseStore, {
    getSubjects: function() {       
       console.log(_subjects);
        return _subjects;

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

    getEditingSubjects: function() {
        if (!_editing_id) {

            return null;
        }
        var index = ByKeyValue(_subjects, "_id", _editing_id);

        return _subjects[index];        
    },
    emitEditSubject: function(callback) {
        this.emit(CHANGE_EDIT_EVENT, callback);
    },
    addEditSubjectListener: function(callback) {
        this.on(CHANGE_EDIT_EVENT, callback);
    },

    getDeleteSubject: function() {
        if (!_deleting_id) {
            return null;
        }
        var index = ByKeyValue(_subjects, "_id", _deleting_id);
        return _subjects[index];        
    },
    emitDeleteSubject: function(callback) {
        this.emit(CHANGE_DELETE_EVENT, callback);
    },
    addDeleteSubjectListener: function(callback) {
        this.on(CHANGE_DELETE_EVENT, callback);
    },
});

AppDispatcher.register(function(payload) {
    switch (payload.action) {
        case SubjectConstants.CREATE_SUBJECT:   
            _addSubject(payload.data.Message.subject);
            SubjectStore.emitChange();            
            break;

        case SubjectConstants.DELETE_SUBJECT:
            _removeSubject(payload.data.Message.subject);
            _getMsg(payload.data.Message);                    
            SubjectStore.emitChange();           
            break;

        case SubjectConstants.ACTION_EDIT:
            _editSubject(payload.data);
            SubjectStore.emitEditSubject();
            break;

        case SubjectConstants.ACTION_DELETE:
            _deleteSubject(payload.data);
            SubjectStore.emitDeleteSubject();
            break;

        case SubjectConstants.UPDATE_SUBJECT:
            _updateSubject(payload.data.Message.subject);
            _getMsg(payload.data.Message);            
            SubjectStore.emitEditSubject();
            SubjectStore.emitChange();            
            break;

        case SubjectConstants.GET_SUBJECT:
            _listSubject(payload.data);
            SubjectStore.emitChange();
            break;
            
        case SubjectConstants.GET_COURSE:
            _listCourse(payload.data);            
            SubjectStore.emitChange();
            break;
    }
});
module.exports = SubjectStore;