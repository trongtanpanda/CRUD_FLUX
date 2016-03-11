import mongoose from 'mongoose';
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const SubjectsSchema = new Schema({
	subject_id: String,
	name: String,
	short_name: String,
	number : Number,	
});

export default module.exports = mongoose.model('Subjects', SubjectsSchema);