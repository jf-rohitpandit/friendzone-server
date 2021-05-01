const express = require('express');
const router = express.Router();
const User = require('../models/userModel');

router.put('/', async (req, res) => {
	try {
		console.log('hi in the friend router');
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

module.exports = router;
