var _ = require("underscore"),
    StudentConstants = require("../constants/student-constants.js"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENT = 'change_edit';
var CHANGE_DELETE_EVENT = 'change_delete';
var CHANGE_IMPORT_EXCEL = 'change_import_excel';
var _students = [];
var _courses= [];
var _editing_id = null;
var _deleting_id = null;
var _msg;
var _importExcel= [];
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
function _checkIsset(student, list){
    var result= [];    
    for(var i=0; i<student.length; i++){
        for(var j= 0; j<list.length; j++){
            if(student[i]._id == list[j].student){
                console.log("co");
                student[i]._isset = true;
                result.push(student[i]);
            }else{
                student[i]._isset = false;
                result.push(student[i]);
            }
        }
    }
    _students = result;
}
function _editStudent(index) {
    _editing_id = index;
}
function _inportExcel(data) {
    _importExcel = data;
}
function _deleteStudent(index) {
    _deleting_id = index;
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
var StudentStore  = _.extend(BaseStore, {
    getStudents: function() {       
       // console.log(_students);
        return _students;

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

    getEditingStudents: function() {
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

    getDeleteStudent: function() {
        if (!_deleting_id) {
            return null;
        }
        var index = ByKeyValue(_students, "_id", _deleting_id);
        return _students[index];        
    },
    emitDeleteStudent: function(callback) {
        this.emit(CHANGE_DELETE_EVENT, callback);
    },
    addDeleteStudentListener: function(callback) {
        this.on(CHANGE_DELETE_EVENT, callback);
    },
    getImportExcel: function(){        
        return _importExcel;
    },
    emitImportExcel: function(callback) {
        this.emit(CHANGE_IMPORT_EXCEL, callback);
    },
    addImportExcelListener: function(callback) {
        this.on(CHANGE_IMPORT_EXCEL, callback);
    },
});

AppDispatcher.register(function(payload) {
    switch (payload.action) {
        case StudentConstants.CREATE_STUDENT:           
            _addStudent(payload.data.student);
            StudentStore.emitChange();            
            break;

        case StudentConstants.DELETE_STUDENT:
            // console.log(payload.data.Message.student);
            _removeStudent(payload.data.Message.student);
            _getMsg(payload.data.Message);                    
            StudentStore.emitChange();           
            break;

        case StudentConstants.ACTION_EDIT:
            _editStudent(payload.data);
            StudentStore.emitEditStudent();
            break;

        case StudentConstants.ACTION_DELETE:
            _deleteStudent(payload.data);
            StudentStore.emitDeleteStudent();
            break;

        case StudentConstants.UPDATE_STUDENT:
            _updateStudent(payload.data.Message.student);
            _getMsg(payload.data.Message);            
            StudentStore.emitEditStudent();
            StudentStore.emitChange();            
            break;

        case StudentConstants.GET_STUDENT:
            _listStudent(payload.data);
            StudentStore.emitChange();
            break;
            
        case StudentConstants.IMPORT_EXCEL:        
            _inportExcel(payload.data);            
            StudentStore.emitImportExcel();
            StudentStore.emitChange();
            break;
         case StudentConstants.FIND_FOR_MARK:
            _checkIsset(payload.data.student,payload.listofterm);
            StudentStore.emitChange();
            break;
    }
});
module.exports = StudentStore;