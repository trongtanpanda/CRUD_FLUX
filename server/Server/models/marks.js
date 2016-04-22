import mongoose from 'mongoose';
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const MarkSchema = new Schema({
	
	student:{
		type:Schema.Types.ObjectId,
		ref: 'Students'
	},
	termClass:{
		type:Schema.Types.ObjectId,
		ref: 'termClass'
	},
	cc: String,
	gk: String,
	tbkt: String,
	t1: String,
	tkml1: String,
	t2: String,
	tkml2: String,
	t3: String,
	by_text: String,
	by_number: String,
});

export default module.exports = mongoose.model('Marks', MarkSchema);