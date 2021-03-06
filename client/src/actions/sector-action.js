var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	SectorAPI = require('../API/sector-api');

var SectorActions = {
	fetchAddSectorFromServer: function() {		
		SectorAPI.getAllSector({}).then(function(sectors) {			
			AppDispatcher.dispatch({
				action:Contants.GET_SECTOR,
				data: sectors,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
	},

	create: function(sector) {  
		SectorAPI.createSector(sector).then(function(data) {   
			console.log('in action',data);        
			AppDispatcher.dispatch({
				action: Contants.CREATE_SECTOR,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(sector) {		
		SectorAPI.updateSector(sector).then(function(updateData){
			AppDispatcher.dispatch({
				action: Contants.UPDATE_SECTOR,
				data: updateData,
                sector: sector,
			});
		}, function(status,text){
			// handle err
		});
	},
	editSector: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_EDIT,
	        data: index,
	    })
    },
	destroy: function(id) {       
		SectorAPI.deleteSector(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_SECTOR,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	},
	deleteSector: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_DELETE,
	        data: index,
	    })
    },

};
module.exports = SectorActions;