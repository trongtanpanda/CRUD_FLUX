import mongoose from 'mongoose';

function connection() {
	mongoose.connect('mongodb://localhost/thu', function(err) {
		var db = mongoose.connection;
		db.on('error', console.error.bind(console, 'connection error:'));
		db.once('open', function (callback) {
  			console.log("Successfully connected !");
		});
	});
};

export default connection