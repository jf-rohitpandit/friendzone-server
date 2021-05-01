const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const path = require('path');

//promisify the fs module functions
const mkdirAsync = util.promisify(fs.mkdir);
const writeFileAsync = util.promisify(fs.writeFile);

const storage = multer.memoryStorage();

const upload = multer({
	storage: storage,
});

router.get('/', (req, res) => {
	res.status(200).json({ message: 'Profile data' });
});

router.put('/', upload.single('avtar'), async (req, res) => {
	try {
		const id = req.userId;
		const { name, gender, dob, country, aboutMe } = req.body;
		const avtar = req.file;
		console.log(avtar);

		//saving the file in the server
		if (avtar) {
			const saveDir = `./upload/${id}`;
			await mkdirAsync(saveDir, { recursive: true });
			const fileName = `${saveDir}/1.${avtar.originalname.split('.')[1]}`;
			await writeFileAsync(fileName, avtar.buffer);
		}

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
		if (avtar) {
			user.avtarUrl = `./upload/${id}/1.${avtar.originalname.split('.')[1]}`;
		}

		await user.save();
		console.log(user);

		res.status(200).json({ message: 'Data updated successfully!' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error });
	}
});

module.exports = router;
