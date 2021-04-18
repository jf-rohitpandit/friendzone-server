const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	dob: {
		type: Date,
		required: true,
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
