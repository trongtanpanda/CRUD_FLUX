var _ = require("underscore"),
    MarkConstants = require("../constants/student-constants.js"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENT = 'change_edit';
var CHANGE_DELETE_EVENT = 'change_delete';
var CHANGE_LIST_EVENT = 'change_list_event';
var _marks = [];
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


function _addMark(mark) {
    _marks.push(mark);
}
function _listMark(data){
    _marks= data;
}
function _listCourse(data){
    _courses =data;
}
function _removeMark(_id) {    
    var i = ByKeyValue(_marks, "_id", _id);
        _marks.splice(i,1);
}

function _editMark(index) {
    _editing_id = index;
}

function _deleteMark(index) {
    _deleting_id = index;
}

function _updateMark(mark) {
    var index = ByKeyValue(_marks, "_id", _editing_id); 
    _marks[index] = mark;
    _editing_id = null;
}

function _getMsg(message){
    _msg=message;    
}
function _deleteMsg(){
    _msg =null;
}
var MarkStore  = _.extend(BaseStore, {
    getMarks: function() { 
        return _marks;
    },
  
    getMessage:function(){
        return _msg;
    },
    emitListChange: function() {
        this.emit(CHANGE_LIST_EVENT);
    },
    getListChangeListener: function(callback) {
        this.on(CHANGE_LIST_EVENT, callback);
    },

    getEditingMarks: function() {
        if (!_editing_id) {

            return null;
        }
        var index = ByKeyValue(_marks, "_id", _editing_id);

        return _marks[index];        
    },
    emitEditMark: function(callback) {
        this.emit(CHANGE_EDIT_EVENT, callback);
    },
    addEditMarkListener: function(callback) {
        this.on(CHANGE_EDIT_EVENT, callback);
    },

    getDeleteMark: function() {
        if (!_deleting_id) {
            return null;
        }
        var index = ByKeyValue(_marks, "_id", _deleting_id);
        return _marks[index];        
    },
    emitDeleteMark: function(callback) {
        this.emit(CHANGE_DELETE_EVENT, callback);
    },
    addDeleteMarkListener: function(callback) {
        this.on(CHANGE_DELETE_EVENT, callback);
    },
});

AppDispatcher.register(function(payload) {
    switch (payload.action) {
        case MarkConstants.CREATE_MARK:           
            _addMark(payload.data.mark);
            MarkStore.emitChange();            
            break;

        case MarkConstants.DELETE_MARK:
            _removeMark(payload.data.Message.mark);
            _getMsg(payload.data.Message);                    
            MarkStore.emitChange();           
            break;

        case MarkConstants.ACTION_EDIT:
            _editMark(payload.data);
            MarkStore.emitEditMark();
            break;

        case MarkConstants.ACTION_DELETE:
            _deleteMark(payload.data);
            MarkStore.emitDeleteMark();
            break;

        case MarkConstants.UPDATE_MARK:
            _updateMark(payload.data.Message.mark);
            _getMsg(payload.data.Message);            
            MarkStore.emitEditMark();
            MarkStore.emitChange();            
            break;

        case MarkConstants.GET_MARK:
            _listMark(payload.data);
            MarkStore.emitChange();
            break;
            
        case MarkConstants.GET_LISTBYTERM:
            _listMark(payload.data.Message.marks);            
            MarkStore.emitListChange();
            break;
    }
});
module.exports = MarkStore;