const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.get('/', (req, res) => {
	res.status(200).json({ message: 'Profile data' });
});

router.put('/', async (req, res) => {
	try {
		const id = req.userId;
		const { name, gender, dob, country, aboutMe } = req.body;

		const user = await User.findOne({ _id: id });

		if (!user) {
			res.status(400).json({ message: 'User not found!' });
			return;
		}

		if (name) {
			user.name = name;
		}
		if (gender) {
			user.gender = gender;
		}
		if (dob) {
			user.dob = dob;
		}
		if (country) {
			user.country = country;
		}
		if (aboutMe) {
			user.aboutMe = aboutMe;
		}

		await user.save();

		res.status(200).json({ message: 'Data updated successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error });
	}
});

module.exports = router;
