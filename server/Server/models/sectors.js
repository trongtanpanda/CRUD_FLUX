import mongoose from 'mongoose';
const Schema = mongoose.Schema,
ObjectId = Schema.ObjectId;
const SectorSchema = new Schema({
	sector_id: String,
	name: String,
	short_name: String,
	english_name : String,
	list_object: [{
		type:Schema.Types.ObjectId,
		ref: 'Subjects'
	}],

});

export default module.exports = mongoose.model('Sectors', SectorSchema);