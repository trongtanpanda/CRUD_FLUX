import mongoose from 'mongoose';
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const Term_classSchema = new Schema({
	term_class_id: String,
	name: String,
	number: Number,
	theory: Number,
	perceive : Number,
	self_taught : Number,
	test_student : Number,
	practive: Number,
	diligence: Number,
	last_test: Number,
	
});

export default module.exports = mongoose.model('Term_class', Term_classSchema);