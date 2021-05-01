const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 6,
	},
	gender: {
		type: String,
	},
	name: {
		type: String,
	},
	dob: {
		type: Date,
	},
	country: {
		type: String,
	},
	state: {
		type: String,
	},
	aboutMe: {
		type: String,
	},
	avtarUrl: {
		type: String,
	},
});

const User = mongoose.model('User', userSchema);
module.exports = User;
