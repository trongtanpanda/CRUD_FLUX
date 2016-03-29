var AppDispatcher = require('../dispatcher/app-dispatcher'),
	Contants = require('../constants/student-constants.js'),
	MaskAPI = require('../API/mask-api');

var MaskActions = {
	fetchAddMaskFromServer: function() {		
		MaskAPI.getMask({}).then(function(Masks) {			
			AppDispatcher.dispatch({
				action:Contants.GET_MASK,
				data: masks,
				// params: {}
			});
		}, function(status, text) {
			// Handle error!
		});
	},

	create: function(mask) {        
		MaskAPI.createMask(mask).then(function(data) {            
			AppDispatcher.dispatch({
				action: Contants.CREATE_MASK,
				data: data
			});
		}, function(status, text) {
			// Handle error
		});
	},

	update: function(mask) {		
		MaskAPI.updateMask(Mask).then(function(updateData){
			AppDispatcher.dispatch({
				action: Contants.UPDATE_MASK,
				data: updateData,
                mask: mask,
			});
		}, function(status,text){
			// handle err
		});
	},
	editMask: function(index) {
	    AppDispatcher.dispatch({
	        action: Contants.ACTION_EDIT,
	        data: index,
	    })
    },
	destroy: function(id) {       
		MaskAPI.deleteMask(id).then(function(data){
			AppDispatcher.dispatch({
				action: Contants.DELETE_MASK,
				data: data,
			});
		},function(status, err){
			// Handle error
		});
	}

};
module.exports = MaskActions;