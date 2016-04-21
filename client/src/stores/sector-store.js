var _ = require("underscore"),
    SectorConstants = require("../constants/student-constants.js"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENT = 'change_edit';
var CHANGE_DELETE_EVENT = 'change_delete';
var _sectors = [];
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


function _addSector(sector) {
    _sectors.push(sector);
}
function _listSector(data){
    _sectors= data;
}
function _listCourse(data){
    _courses =data;
}
function _removeSector(_id) {    
    var i = ByKeyValue(_sectors, "_id", _id);
        _sectors.splice(i,1);
}

function _editSector(index) {
    _editing_id = index;
}

function _deleteSector(index) {
    _deleting_id = index;
}

function _updateSector(sector) {
    var index = ByKeyValue(_sectors, "_id", _editing_id); 
    _sectors[index] = sector;
    _editing_id = null;
}

function _getMsg(message){
    _msg=message;    
}
function _deleteMsg(){
    _msg =null;
}
var SectorStore  = _.extend(BaseStore, {
    getSectors: function() {       
       console.log(_sectors);
        return _sectors;

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

    getEditingSectors: function() {
        if (!_editing_id) {

            return null;
        }
        var index = ByKeyValue(_sectors, "_id", _editing_id);

        return _sectors[index];        
    },
    emitEditSector: function(callback) {
        this.emit(CHANGE_EDIT_EVENT, callback);
    },
    addEditSectorListener: function(callback) {
        this.on(CHANGE_EDIT_EVENT, callback);
    },

    getDeleteSector: function() {
        if (!_deleting_id) {
            return null;
        }
        var index = ByKeyValue(_sectors, "_id", _deleting_id);
        return _sectors[index];        
    },
    emitDeleteSector: function(callback) {
        this.emit(CHANGE_DELETE_EVENT, callback);
    },
    addDeleteSectorListener: function(callback) {
        this.on(CHANGE_DELETE_EVENT, callback);
    },
});

AppDispatcher.register(function(payload) {
    console.log(payload.action);
    switch (payload.action) {        
        case SectorConstants.CREATE_SECTOR: 
            console.log(payload.data);
            _addSector(payload.data.sector);
            SectorStore.emitChange();            
            break;

        case SectorConstants.DELETE_SECTOR:
            _removeSector(payload.data.Message.sector);
            _getMsg(payload.data.Message);                    
            SectorStore.emitChange();           
            break;

        case SectorConstants.ACTION_EDIT:
            _editSector(payload.data);
            SectorStore.emitEditSector();
            break;

        case SectorConstants.ACTION_DELETE:
            _deleteSector(payload.data);
            SectorStore.emitDeleteSector();
            break;

        case SectorConstants.UPDATE_SECTOR:
            _updateSector(payload.data.Message.sector);
            _getMsg(payload.data.Message);            
            SectorStore.emitEditSector();
            SectorStore.emitChange();            
            break;

        case SectorConstants.GET_SECTOR:
            _listSector(payload.data);
            SectorStore.emitChange();
            break;
            
        case SectorConstants.GET_COURSE:
            _listCourse(payload.data);            
            SectorStore.emitChange();
            break;
    }
});
module.exports = SectorStore;