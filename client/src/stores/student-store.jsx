// var _ = require("underscore"),
//     StudentConstants = require("../constants/student-constants"),
//     AppDispatcher = require("../dispatcher/app-dispatcher"),    
//     BaseStore = require('./base-store');

// var CHANGE_EVENT = 'change';
// var CHANGE_EDIT_EVENT = 'change_edit';

// var _students = [];
// var _editing_id = null;
// var _msg;

// function ByKeyValue(arraytosearch, key, valuetosearch) { 
//     for (var i = 0; i < arraytosearch.length; i++) { 
//         if (arraytosearch[i][key] == valuetosearch) {
//             return i;
//         }
//     }
//     return null;
// }

// function _addStudent(student) {
//     _students.push(student);
// }
// function _listStudent(data){
//     _students= data;
// }
// function _removeStudent(_id) {
//     var i = ByKeyValue(_students, "_id", _editing_id);
//     _students.splice(i,1);
// }

// function _editStudent(index) {
//     _editing_id = index;
// }

// function _updateStudent(student) {
//     var index = ByKeyValue(_students, "_id", _editing_id);

//     _students[index] = student;
//     _editing_id = null;
// }
// function _getMsg(message){
//     _msg=message;
// }
// var StudentStore  = _.extend(BaseStore, {
//     getStudents: function() {
//         return _students;
//     },
//     getMessage:function(){
//         return _msg;
//     },
//     // emitChange: function() {
//     //     this.emit(CHANGE_EVENT);
//     // },
//     // addChangeListener: function(callback) {
//     //     this.on(CHANGE_EVENT, callback);
//     // },

//     getEditingStudent: function() {
//         if (!_editing_id) {
//             return null;
//         }
//         var index = ByKeyValue(_students, "_id", _editing_id);
//         return _students[index];        
//     },
//     emitEditStudent: function(callback) {
//         this.emit(CHANGE_EDIT_EVENT, callback);
//     },
//     addEditStudentListener: function(callback) {
//         this.on(CHANGE_EDIT_EVENT, callback);
//     },
// });

// AppDispatcher.register(function(payload) {
//     switch (payload.action) {
//         case StudentConstants.ACTION_ADD:
//             _getMsg(payload.data.Message);
//             _addStudent(payload.data.user);
//             StudentStore.emitChange();
//             break;

//         case StudentConstants.ACTION_REMOVE:
//             _removeStudent(payload._id);
//             StudentStore.emitChange();
//             break;

//         case StudentConstants.ACTION_EDIT:
//             _editStudent(payload.index);
//             StudentStore.emitEditStudent();
//             break;

//         case StudentConstants.ACTION_UPDATE:
//             _updateStudent(payload.student);
//             StudentStore.emitEditStudent();
//             StudentStore.emitChange();
//             break;

//         case StudentConstants.GET_USERS:
//             _listStudent(payload.data);
//             StudentStore.emitChange();
//             break;
//     }
// });

// module.exports = StudentStore;