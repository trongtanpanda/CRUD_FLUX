var request = require('superagent'),
	AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contant = require('../constants/student-constants');
	promise = require('es6-promise').Promise;

var API_URL = 'http://localhost:3008/st/students';
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

function getStudentData() {	
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

function createStudent(newStudent) {   
	var t = new promise(function(resolve, reject){
		request.post(API_URL)
			.timeout(TIMEOUT)
			.send({student: newStudent})
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

function updateStudent(updateData) {	
	var t = new promise(function(resolve, reject){
		request.put(API_URL)
			.timeout(TIMEOUT)
			.set('Content-Type', 'application/json')
			.send({student: updateData})
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

function deleteStudent(studentID) {    
	var t = new promise(function(resolve, reject){
		request.delete(API_URL)
            .timeout(TIMEOUT)
            .set('Content-Type', 'application/json')
            .send({student: studentID})			
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
function saveExcel(list){
	var t = new promise(function(resolve, reject){
		request.post(API_URL+"/excel")
			.timeout(TIMEOUT)
			.send({list: list})
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
function findForMArk(clss){
	var t = new promise(function(resolve, reject){
		request.put(API_URL+"/find")
			.timeout(TIMEOUT)
			.send({clss: clss})
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
module.exports = {
	getStudent: getStudentData,
	createStudent: createStudent,
	deleteStudent: deleteStudent,
	updateStudent: updateStudent,
	saveExcel: saveExcel,
	findForMArk: findForMArk
};