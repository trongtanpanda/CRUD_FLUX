var _ = require("underscore"),
    StudentConstants = require("../constants/student-constants.js"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENT = 'change_edit';

var _marks = [];
var _student= [];
var _termClass = [];

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
function _listMark(data){
    _marks= data;
}
function _listStudent(data){
    _student =data;
}
function _listTermClass(data){
    _termClass =data;
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
function _mapTable(tb1, tb2){

}

var MarkStore  = _.extend(BaseStore, {
    getMarks: function() {
      for(var i=0; i<_marks.length; i++){
            for (var j = 0; j < _student.length; j++) {
                if(_marks[i].student===_student[j]._id){
                     _marks[i].student = _student[j];
                }
            };
            for (var j = 0; j < _termClass.length; j++) {
                if(_marks[i].term_class===_termClass[j]._id){
                     _marks[i].term_class = _termClass[j];
                }
            };
        };
      
        return _marks;
    },
    getStudent: function(){
        return _student;
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
   
        case StudentConstants.GET_MarkS:
            _listMark(payload.data);
            MarkStore.emitChange();
            break;
        case StudentConstants.GET_STUDENT:
            _listStudent(payload.data);
            MarkStore.emitChange();
            break;        
        case StudentConstants.GET_TERM_CLASS:
            _listTermClass(payload.data);
            MarkStore.emitChange();
            break;   
    }
});
module.exports = MarkStore;