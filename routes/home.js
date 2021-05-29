const express = require('express');
const router = express.Router();
const faker = require('faker');
const User = require('../models/userModel');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

function getAge(dateString) {
	var today = new Date();
	var birthDate = new Date(dateString);
	var age = today.getFullYear() - birthDate.getFullYear();
	var m = today.getMonth() - birthDate.getMonth();
	if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}
	return age;
}

router.get('/', async (req, res) => {
	try {
		if (!req.userId) {
			res.status(401).json({ messagse: 'Unauthorised user' });
			return;
		}

		const count = await User.countDocuments();

		if (count === 1) {
			res.status(200).json({ userInfo: null });
			return;
		}
		const myCount = await User.findOne({ _id: req.userId }).select('count');
		let randomUser = 0;
		while (randomUser === 0 || myCount === randomUser) {
			randomUser = Math.floor(Math.random() * count) + 1;
			console.log(randomUser);
		}

		const user = await User.findOne({ count: randomUser }).select('-password');

		let photo;
		if (user) {
			// if (user.avtarU) {
			// 	photo = await readFileAsync(user.avtarUrl);
			// }

			const image = user.avtar || '';
			const name = user.name || '';
			const country = user.country || '';
			const age = getAge(user.dob);
			const aboutMe = user.aboutMe;
			const gender = user.gender;
			const id = user._id;

			res
				.status(200)
				.json({ userInfo: { image, name, age, gender, aboutMe, country, id } });
		}
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error });
	}
});

module.exports = router;
