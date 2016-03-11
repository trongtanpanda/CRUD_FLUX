import mongoose from 'mongoose';
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const courseSchema = new Schema({
	course_id: String,
	name: String,
	incoming_year: Number,
	full: String,


});

export default module.exports = mongoose.model('Course', courseSchema);