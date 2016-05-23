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
	sector:{
		type:Schema.Types.ObjectId,
		ref: 'sector'
	},
	clss{
		type:Schema.Types.ObjectId,
		ref: 'clss'
	},
});
StudentsSchema.index({'$**': 'text'});
export default module.exports = mongoose.model('Students', StudentsSchema);