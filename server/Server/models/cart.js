import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const cartSchema = new Schema({
	id		: String,
	title	: String,
	cost	: Number
});

export default module.exports = mongoose.model('Carts', cartSchema);