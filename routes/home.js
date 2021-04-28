const express = require('express');
const router = express.Router();
const faker = require('faker');

router.get('/', (req, res) => {
	const image = faker.image.avatar();
	const name = faker.name.firstName() + faker.name.lastName();
	const country = faker.address.country();
	const age = Math.floor(Math.random() * 20 + 18);
	const aboutMe = faker.lorem.lines();
	const gender = faker.name.gender();

	res
		.status(200)
		.json({ data: { image, name, age, gender, aboutMe, country } });
});

module.exports = router;
