import mongoose from 'mongoose';
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const MaskSchema = new Schema({
	
	student:{
		type:Schema.Types.ObjectId,
		ref: 'Students'
	},
	term_class:{
		type:Schema.Types.ObjectId,
		ref: 'Term_class'
	},
	cc: Number,
	gk: Number,
	tbkt: Number,
	t1: Number,
	tkml1: Number,
	t2: Number,
	tkml2: Number,
	t3: Number,
	by_text: String,
	by_number: Number,
});

export default module.exports = mongoose.model('Masks', MaskSchema);