const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const fs = require('fs');
const util = require('util');

const readFileAsync = util.promisify(fs.readFile);

router.put('/', async (req, res) => {
	try {
		const id = req.userId;
		const friendId = req.body.friendId;

		const user = await User.findOne({ _id: id });

		if (user.friend.length === 0) {
			user.friend.push(friendId);
		} else {
			user.friend.unshift(friendId);
		}

		await user.save();

		res.status(200).json({ message: 'success' });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error });
	}
});

router.get('/', async (req, res) => {
	try {
		const id = req.userId;
		const user = await User.findOne({ _id: id });

		console.log(user.friend);

		const list = [];

		for (let i = 0; i < user.friend.length; i++) {
			const tempUser = await User.findOne({ _id: user.friend[i] });
			const photo = await readFileAsync(`compress/${tempUser.id}/1.jpg`);
			let temp = {
				name: tempUser.name,
				id: tempUser.id,
				photo: photo,
			};

			list.push(temp);
		}

		res.status(200).json({ list: list });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;
