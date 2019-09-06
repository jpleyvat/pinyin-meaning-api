const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	hanzi: {
		type: String,
		required: true,
		min: 6,
		max: 255
	},
	pinyin: {
		type: String,
		required: false,
		min: 6,
		max: 255
	},
	meaning: {
		type: String,
		required: false,
		max: 1024
	}
});

module.exports = mongoose.model('Character', userSchema);
