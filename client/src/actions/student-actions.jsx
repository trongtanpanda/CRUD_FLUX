// var StudentConstants = require("../constants/student-constants"),
//     AppDispatcher = require("../dispatcher/app-dispatcher");
// var API = require("../API.js");
// var StudentActions = {
//     addStudent: function(student) {
//         API.addUser(student,function(data){
//             AppDispatcher.dispatch({
//                 action: StudentConstants.ACTION_ADD,
//                 data: data,
//                 student: student,
//             });
//         });
//     },
//     removeStudent: function(_id) {
//         API.deleteUser(_id,function(data){
//             AppDispatcher.dispatch({
//                 action: StudentConstants.ACTION_REMOVE,
//                 data: data,
//                 _id: _id,
//             })
//         })
//     },
//     editStudent: function(index) {
//         AppDispatcher.dispatch({
//             action: StudentConstants.ACTION_EDIT,
//             index: index,
//         })
//     },
//     updateStudent: function(student) {
//         API.updateUser(student, function(data){
//         AppDispatcher.dispatch({
//             action: StudentConstants.ACTION_UPDATE,
//             student: student,
//             data: data,
//         });
//         });
//     },
//     getListUsers: function(){
//         API.getAll(function(data){
//             AppDispatcher.dispatch({
//                 action: StudentConstants.GET_USERS,
//                 data: data,
//             });
//         });
//     }
// }

// module.exports = StudentActions;