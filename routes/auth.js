const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/userModel');

const router = express.Router();

router.post(
	'/signup',
	body('email').not().isEmpty().isEmail(),
	body('password').not().isEmpty().isLength({ min: 6 }),
	async (req, res) => {
		try {
			const { email, password } = req.body;

			const errors = validationResult(req);

			if (!errors.isEmpty()) {
				console.log(errors);
				res.status(400).json({ error: errors.array() });
				return;
			}

			const isUser = await User.findOne({ email });
			console.log(isUser);
			if (isUser !== null) {
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
	}
);

router.post(
	'/login',
	body('email').not().isEmpty().isEmail(),
	body('password').not().isEmpty().isLength({ min: 6 }),
	async (req, res) => {
		try {
			const { email, password } = req.body;
			console.log(email, password);

			const errors = validationResult(req);

			if (errors.length) {
				console.log(errors);
				res.status(400).json({ error: errors.array() });
				return;
			}

			const isUser = await User.findOne({ email });
			if (!isUser) {
				console.log('hi in ');
				res.status(400).json({ message: 'Email or password is invalid!' });
				return;
			}

			console.log(isUser);
			console.log(password);

			if (isUser.password !== password) {
				console.log('password not match');
				console.log(isUser.password);
				res.status(400).json({ message: 'Email or password is invalid!' });
				return;
			}

			res.status(200).json({ user: isUser });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}
);

module.exports = router;
