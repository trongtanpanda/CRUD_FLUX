var request = require('superagent'),
	AppDispatcher = require('../app-dispatcher.jsx'),
	Contants = require('../contants/student-actions.jsx'),
	promise = require('es6-promise').Promise;

var API_URL ='/';
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

function getcourseData(filter){
	var c = new promise(function(resolve, reject){
		request.get(API_URL + '/')
			.timeout(TIMEOUT)
			.query(filter)
			.end(function(res){
				var data = null;
				if(res.status === 200){
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