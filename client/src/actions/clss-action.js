var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	ClssAPI = require('../API/clss-api.js');

var clssActions = {
	fetchAddClssFromServer: function() {		
		ClssAPI.getClss({}).then(function(clsss) {
			AppDispatcher.dispatch({
				action:Contants.GET_CLSS,
				data: clsss
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
	},

	create: function(clss) {        
		ClssAPI.createClss(clss).then(function(data) {  		         
			AppDispatcher.dispatch({
				action: Contants.CREATE_CLSS,
				data: data,
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(clss) {
		ClssAPI.updateClss(clss).then(function(data){		 
			AppDispatcher.dispatch({				
				action: Contants.UPDATE_CLSS,
				data: data,
			});
		}, function(status,text){
			
		});
	},
	editClss: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_EDIT_CLSS,
	        data: index,
	    })
    },
	destroy: function(id) {       
		ClssAPI.deleteClss(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_CLSS,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	},
	deleteClss: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_DELETE_CLSS,
	        data: index,
	    })
    },
    getAllClass: function(){
    	ClssAPI.getClss({}).then(function(clss) {			
			AppDispatcher.dispatch({
				action:Contants.GET_ALL_ClASS,
				data: clss,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
    },

};
module.exports = clssActions;