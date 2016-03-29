var request = require('superagent'),
	AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contant = require('../constants/student-constants');
	promise = require('es6-promise').Promise;

var API_URL = 'http://localhost:3008/us/users';
var TIMEOUT = 10000;

var _pendingRequests = [];

function abortPendingRequests(key){
	if(_pendingRequests[key]) {
		_pendingRequests[key].callback = function(){};
		_pendingRequests[key].abort();
		_pendingRequests[key] = null;
	}
}

function makeUrl(part) {
	return API_URL + part;
}

function getAllUser() {	
	var t = new promise(function(resolve, reject){
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

	return t;;
}

function createUser(user) {   
	var t = new promise(function(resolve, reject){
		request.post(API_URL)
			.timeout(TIMEOUT)
			.send({user: user})
			.end(function(err,res) {
				data = JSON.parse(res.text);
				if(res.status === 201) {                    
                    resolve(data);
				}else {
					reject(res.status, res);                    
				}
			});
	});

	return t;
}

function updateUser(user) {	
	var t = new promise(function(resolve, reject){
		request.put(API_URL)
			.timeout(TIMEOUT)
			.set('Content-Type', 'application/json')
			.send({user: user})
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

function deleteUser(user) {    
	var t = new promise(function(resolve, reject){
		request.delete(API_URL)
            .timeout(TIMEOUT)
            .set('Content-Type', 'application/json')
            .send({user: user})			
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
	getAllUser: getAllUser,
	createUser: createUser,
	deleteUser: deleteUser,
	updateUser: updateUser
};