var StudentConstants = require("../constants/student-constants"),
    AppDispatcher = require("../dispatcher/app-dispatcher");
var API = require("../API.js");

var CourseActions = {
 getListCourse: function(){
        API.getCourse(function(data){
            AppDispatcher.dispatch({
                action: StudentConstants.GET_COURSE,
                data: data,
            });
        });
    }
}

module.exports = CourseActions;