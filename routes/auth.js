const express = require('express');
const User = require('../models/userModel');

const router = express.Router();

router.post('/signup', async (req, res) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			res.status(400).json({ message: 'Enter Email and Password' });
			return;
		}

		const isUser = await User.find({ email });
		if (isUser) {
			res
				.status(400)
				.json({ message: 'Email already registered! Try another email' });
			return;
		}

		const newUser = new User({ email, password });
		await newUser.save();
		res.status(201).json({ user: newUser });
		return;
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
