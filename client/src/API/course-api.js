var request = require('superagent'),
	AppDispatcher = require('../dispatcher/app-dispatcher.jsx'),
	Contant = require('../constants/student-constants.jsx');
	promise = require('es6-promise').Promise;

var API_URL ='http://localhost:3008/co/course';
var TIMEOUT =10000;

var _pendingRequests =[];

function abortPendingRequests(key){
	if(_pendingRequests[key]){
		_pendingRequests[key]._callback = function(){};
		_pendingRequests[key].abort();
		_pendingRequests[key] = null;
	}
}

function makeUrl(part) {
	return API_URL + part;
}

function getCourse(filter){
	var c = new promise(function(resolve, reject){
		request.get(API_URL)		
			.timeout(TIMEOUT)
			.end(function(err,res){				
				var data = null;
				if(res.status === 200) {
					data = JSON.parse(res.text);
					resolve(data);
				}else{
					reject(res.status, res.text);
				}
			});
	});
	return c;
}
function createCourse(newCourse) {
	var c = new promise(function(resolve,reject){
		request.post(API_URL +'/')
			.timeout(TIMEOUT)
			.set('Content-Type', 'application/json')
			.send({coursr: newCourse})
			.end(function(res){
				var data = JSON.parse(res.text);
				if(res.status === 201){
					resolve(data);
				}else{
					reject(res.status, res.text);
				}
			});
	});
	return c;

}

function updateCourse(updateData) {	
	var t = new promise(function(resolve, reject){
		request.put(API_URL)
			.timeout(TIMEOUT)
			.set('Content-Type', 'application/json')
			.send({Course: updateData})
			.end(function(err,res) {
                data = JSON.parse(res.text);				
				if(res.status === 201){
					resolve(data);                    
				}
				else{
					reject(res.status, res.text);
				}
			});
	});

	return t;
}

function deleteCourse(CourseID) {    
	var t = new promise(function(resolve, reject){
		request.delete(API_URL+"/delete")
            .timeout(TIMEOUT)
            .set('Content-Type', 'application/json')
            .send({CourseId: CourseID})			
			.end(function(err,res) {
                data = JSON.parse(res.text);
				if(res.status === 201) {                    
					resolve(data);
				}
				else{
					reject(res.status, res.text);
				}
			});
	});

	return t;
}
module.exports = {
	getCourse: getCourse,
	createCourse: createCourse,
	deleteCourse: deleteCourse,
	updateCourse: updateCourse
};