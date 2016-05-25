var request = require('superagent'),
	AppDispatcher = require('../dispatcher/app-dispatcher.js'),
	Contant = require('../constants/student-constants.js');
	promise = require('es6-promise').Promise;

var API_URL ='http://localhost:3008/cl/clss';
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

function getClss(filter){
	var c = new promise(function(resolve, reject){
		request.get(API_URL)		
			.timeout(TIMEOUT)
			.end(function(err,res){	
				// console.log(res);			
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
function createClss(newClss) {   
	var t = new promise(function(resolve, reject){
		request.post(API_URL)
			.timeout(TIMEOUT)
			.send({clss: newClss})
			.end(function(err,res) {
				// console.log(res.text);
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

function updateClss(updateData) {	
	var t = new promise(function(resolve, reject){
		request.put(API_URL)
			.timeout(TIMEOUT)
			.send({clss: updateData})
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

function deleteClss(clssId) {    
	var t = new promise(function(resolve, reject){
		request.delete(API_URL)
            .timeout(TIMEOUT)
            .send({clss: clssId})			
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
	getClss: getClss,
	createClss: createClss,
	deleteClss: deleteClss,
	updateClss: updateClss
};