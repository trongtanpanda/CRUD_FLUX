var _ = require("underscore"),
    TermClassConstants = require("../constants/student-constants.js"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENT = 'change_edit';
var CHANGE_DELETE_EVENT = 'change_delete';
var GET_BY_NAME =' get_by_name';
var _termClasss = [];
var _courses= [];
var _editing_id = null;
var _deleting_id = null;
var _msg;
var _term = null;

function ByKeyValue(arraytosearch, key, valuetosearch) { 
    for (var i = 0; i < arraytosearch.length; i++) { 
        if (arraytosearch[i][key] == valuetosearch) {
            return i;
        }
    }
    return null;
}


function _addTermClass(termClass) {
    _termClasss.push(termClass);
}
function _listTermClass(data){
    _termClasss= data;
}
function _getByName(term){
    _term = term;
}
function _listCourse(data){
    _courses =data;
}
function _removeTermClass(_id) {    
    var i = ByKeyValue(_termClasss, "_id", _id);
        _termClasss.splice(i,1);
}

function _editTermClass(index) {
    _editing_id = index;
}

function _deleteTermClass(index) {
    _deleting_id = index;
}

function _updateTermClass(termClass) {
    var index = ByKeyValue(_termClasss, "_id", _editing_id); 
    _termClasss[index] = termClass;
    _editing_id = null;
}

function _getMsg(message){
    _msg=message;    
}
function _deleteMsg(){
    _msg =null;
}
var TermClassStore  = _.extend(BaseStore, {
    getTermClasss: function() {
        return _termClasss;

    },
    getTermByName: function(){
        return _term;
    },
    getMessage:function(){
        return _msg;
    },
    emitGetByName: function() {
        this.emit(GET_BY_NAME);
    },
    getByNameListener: function(callback) {
        this.on(GET_BY_NAME, callback);
    },

    getEditingTermClasss: function() {
        if (!_editing_id) {

            return null;
        }
        var index = ByKeyValue(_termClasss, "_id", _editing_id);

        return _termClasss[index];        
    },
    emitEditTermClass: function(callback) {
        this.emit(CHANGE_EDIT_EVENT, callback);
    },
    addEditTermClassListener: function(callback) {
        this.on(CHANGE_EDIT_EVENT, callback);
    },

    getDeleteTermClass: function() {
        if (!_deleting_id) {
            return null;
        }
        var index = ByKeyValue(_termClasss, "_id", _deleting_id);
        return _termClasss[index];        
    },
    emitDeleteTermClass: function(callback) {
        this.emit(CHANGE_DELETE_EVENT, callback);
    },
    addDeleteTermClassListener: function(callback) {
        this.on(CHANGE_DELETE_EVENT, callback);
    },
});

AppDispatcher.register(function(payload) {
    switch (payload.action) {
        case TermClassConstants.CREATE_TERMCLASS:       
            _addTermClass(payload.data.Message.termClass);
            TermClassStore.emitChange();            
            break;

        case TermClassConstants.DELETE_TERMCLASS:
            _removeTermClass(payload.data.Message.termClass);
            _getMsg(payload.data.Message);                    
            TermClassStore.emitChange();           
            break;

        case TermClassConstants.ACTION_EDIT:
            _editTermClass(payload.data);
            TermClassStore.emitEditTermClass();
            break;

        case TermClassConstants.ACTION_DELETE:
            _deleteTermClass(payload.data);
            TermClassStore.emitDeleteTermClass();
            break;

        case TermClassConstants.UPDATE_TERMCLASS:
            _updateTermClass(payload.data.Message.termClass);
            _getMsg(payload.data.Message);            
            TermClassStore.emitEditTermClass();
            TermClassStore.emitChange();            
            break;

        case TermClassConstants.GET_TERMCLASS:
            _listTermClass(payload.data);
            TermClassStore.emitChange();
            break;
            
        case TermClassConstants.GET_COURSE:
            _listCourse(payload.data);            
            TermClassStore.emitChange();
            break;
        case TermClassConstants.GET_TERM_BY_NAME:
            _getByName(payload.data.Message.termClass);   
            TermClassStore.emitGetByName();        
            break;
    }
});
module.exports = TermClassStore;