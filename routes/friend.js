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
		if (!req.userId) {
			res.status(401).json({ message: 'Unauthorized user' });
			return;
		}
		const id = req.userId;
		const user = await User.findOne({ _id: id });

		console.log(user.friend);

		if (!user.friend) {
			res.status(200).json({ list: [] });
			return;
		}

		const list = [];

		for (let i = 0; i < user.friend.length; i++) {
			const tempUser = await User.findOne({ _id: user.friend[i] });

			let temp = {
				name: tempUser.name,
				id: tempUser.id,
				photo: tempUser.avtar,
			};
			// if (tempUser.avtarUrl) {
			// 	const photo = await readFileAsync(`compress/${tempUser.id}/1.jpg`);

			// 	temp['photo'] = photo;
			// }

			list.push(temp);
		}

		res.status(200).json({ list: list });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: error });
	}
});

router.get('/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const tempUser = await User.findOne({ _id: id });

		let temp = {
			name: tempUser.name,
			id: tempUser.id,
			photo: tempUser.avtar,
		};
		// if (tempUser.avtar) {
		// 	const photo = await readFileAsync(`compress/${tempUser.id}/1.jpg`);

		// 	temp['photo'] = photo;
		// }

		res.status(200).json({ user: temp });
	} catch (error) {
		res.status(500).json({ error: error });
	}
});

module.exports = router;
