var _ = require("underscore"),
    StudentConstants = require("../constants/student-constants.js"),
    AppDispatcher = require("../dispatcher/app-dispatcher"),    
    BaseStore = require('./base-store');

var CHANGE_EVENT = 'change';
var CHANGE_EDIT_EVENT = 'change_edit';

var _departments = [];
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

function _addDepartment(department) {
    _departments.push(department);
}
function _listDepartment(data){
    _departments= data;    
}
function _listCourse(data){
    _courses =data;
}
function _removeStudent(_id) {    
    var i = ByKeyValue(_departments, "_id", _id);
        _departments.splice(i,1);
}

function _editDepartment(index) {
    _editing_id = index;
}

function _updateStudent(student) {
    var index = ByKeyValue(_departments, "_id", _editing_id); 
    _departments[index] = student;
    _editing_id = null;
}
function _getMsg(message){
    _msg=message;    
}
function _deleteMsg(){
    _msg =null;
}
var DepartmentStore  = _.extend(BaseStore, {
    getDepartments: function() {
       
        return _departments;
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

    getEditingDepartment: function() {
        if (!_editing_id) {
            return null;
        }
        var index = ByKeyValue(_departments, "_id", _editing_id);
        return _departments[index];        
    },
    emitEditDepartment: function(callback) {
        this.emit(CHANGE_EDIT_EVENT, callback);
    },
    addEditDepartmentListener: function(callback) {
        this.on(CHANGE_EDIT_EVENT, callback);
    },
});

AppDispatcher.register(function(payload) {
    switch (payload.action) {
        
        case StudentConstants.GET_DEPARTMENT:            
            _listDepartment(payload.data);
            DepartmentStore.emitChange();
            break;
        case StudentConstants.CREATE_DEPARTMENT: 
            _addDepartment(payload.data.department);
            DepartmentStore.emitChange();
            break;
        case StudentConstants.ACTION_EDIT: 
            _editDepartment(payload.data);
            DepartmentStore.emitEditDepartment();
            break;   
        
    }
});
module.exports = DepartmentStore;