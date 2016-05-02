import mongoose from 'mongoose';
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const StudentsSchema = new Schema({
	student_id: String,
	firstname: String,	
	lastname : String,
	native: String,
	gender: String,
	birthday: String,

});

export default module.exports = mongoose.model('Students', StudentsSchema);