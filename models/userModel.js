const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
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
	info: {
		type: String,
	},
	avtarUrl: {
		type: String,
	},
});

const User = mongoose.model('User', userSchema);
export default User;
