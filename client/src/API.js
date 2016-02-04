var $ = require('jquery');
var URL = 'http://localhost:3008/api/users';
var URL_COURSE ='http://localhost:3008/co/course';
var API = {
	getAll: function(success, failure) {
    $.ajax({
      url: URL,
      type: 'GET',
      dataType: 'json',
      success : function(data){
        success(data);
     },
     error : function(xhr, status, error){
        failure(error);
     }
    });
  },
  addUser: function(user, success, failure) {
    $.ajax({
      url: URL,
      type: 'POST',
      dataType: 'json',
      data: user,
      success : function(data){
        success(data);
     },
     error : function(xhr, status, error){
        failure(error);
     }
    });
  },
  deleteUser: function(_id,success,failure){
    $.ajax({
      url: URL + '/'+_id,
      type: 'DELETE',
      dataType: 'json',
      success:function(data){
        success(data);
      },
      error: function(xhr,status,error){
        failure(error);
      }
    });
  },
  updateUser: function(user,success,failure){
    $.ajax({
      url: URL,
      type: 'PUT',
      dataType: 'json',
      data:user,
      success:function(data){
        success(data);
      },
      error: function(xhr,status,error){
        failure(error);
      }
    });
  },
  getCourse: function(success,failure){
    $.ajax({
      url: URL_COURSE,
      type: 'GET',
      dataType: 'json',
      success: function(data){
        success(data);
      },
      error: function(xhr, status,error){
        failure(error);
      }
    });
  },
};
module.exports = API;