import mongoose from 'mongoose';
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const DepartmentSchema = new Schema({
	department_id: String,
	name: String,
	dean: String,
	ministry : String,
	phone: String,

});

export default module.exports = mongoose.model('Departments', DepartmentSchema);