import mongoose from 'mongoose';
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const TermClassSchema = new Schema({
	termClass_id: String,
	name: String,
	number: String,
	theory: String,
	perceive : String,
	self_taught : String,
	test_student : String,
	practive: String,
	diligence: String,
	last_test: String,
	
});

export default module.exports = mongoose.model('TeamClass', TermClassSchema);