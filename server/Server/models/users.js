import mongoose from 'mongoose';
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const usersSchema = new Schema({
	name: String,
	course:{
		type:Schema.Types.ObjectId,
		ref: 'Course'
	},

});

export default module.exports = mongoose.model('Users', usersSchema);