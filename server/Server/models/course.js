import mongoose from 'mongoose';
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const courseSchema = new Schema({
	name: String,
	number: Number,

});

export default module.exports = mongoose.model('Course', courseSchema);