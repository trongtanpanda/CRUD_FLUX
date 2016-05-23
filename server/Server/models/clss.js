import mongoose from 'mongoose';
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const ClssSchema = new Schema({	
	name: String,
	short_name: String,
	number : String,	
	course: {
		type:Schema.Types.ObjectId,
		ref: 'Course'
	}
});

export default module.exports = mongoose.model('Clss', ClssSchema);