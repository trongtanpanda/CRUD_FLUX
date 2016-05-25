var _ = require("underscore"),
    ClssConstants = require("../constants/student-constants"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENTS = 'change_edit';
var CHANGE_DELETE_EVENTS = 'change_delete';
var _clss= [];
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


function _addClss(clss) {
    _clss.push(clss);
}
function _listClss(data){
    _clss= data;
}

function _removeClss(_id) {    
    var i = ByKeyValue(_clss, "_id", _id);
        _clss.splice(i,1);
}

function _editClss(index) {
    _editing_id = index;
}

function _deleteClss(index) {
    _deleting_id = index;
}

function _updateClss(clss) {
    var index = ByKeyValue(_clss, "_id", _editing_id); 
    _clss[index] = clss;
    _editing_id = null;
}

function _getMsg(message){
    _msg=message;    
}
function _deleteMsg(){
    _msg =null;
}
var ClssStore  = _.extend(BaseStore, {
    getClss: function() { 
        // console.log("this is in store");
        return _clss;
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

    getEditingClsss: function() {
        if (!_editing_id) {

            return null;
        }
        var index = ByKeyValue(_clss, "_id", _editing_id);

        return _clss[index];        
    },
    emitEditClss: function(callback) {
        this.emit(CHANGE_EDIT_EVENTS, callback);
    },
    addEditClssListener: function(callback) {
        this.on(CHANGE_EDIT_EVENTS, callback);
    },

    getDeleteClss: function() {
        if (!_deleting_id) {
            return null;
        }
        var index = ByKeyValue(_clss, "_id", _deleting_id);
        return _clss[index];        
    },
    emitDeleteClss: function(callback) {
        this.emit(CHANGE_DELETE_EVENTS, callback);
    },
    addDeleteClssListener: function(callback) {
        this.on(CHANGE_DELETE_EVENTS, callback);
    },
});

AppDispatcher.register(function(payload) {
    switch (payload.action) {

        case ClssConstants.CREATE_CLSS:
            _addClss(payload.data.clss);
            ClssStore.emitChange();            
            break;

        case ClssConstants.DELETE_CLSS:
            _removeClss(payload.data.Message.clss);
            _getMsg(payload.data.Message);                    
            ClssStore.emitChange();           
            break;

        case ClssConstants.ACTION_EDIT_CLSS:
            _editClss(payload.data);
            ClssStore.emitEditClss();
            break;

        case ClssConstants.ACTION_DELETE_CLSS:
            _deleteClss(payload.data);
            ClssStore.emitDeleteClss();
            break;

        case ClssConstants.UPDATE_CLSS:

            _updateClss(payload.data.Message.clss);
            // _getMsg(payload.data.Messageh);            
            ClssStore.emitEditClss();
            ClssStore.emitChange();            
            break;

        case ClssConstants.GET_CLSS:
            // console.log(payload.data);
            _listClss(payload.data);
            ClssStore.emitChange();
            break;            
       
    }
});
module.exports = ClssStore;