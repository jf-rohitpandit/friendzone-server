const express = require('express');
const sharp = require('sharp');
const router = express.Router();
const User = require('../models/userModel');
const multer = require('multer');
const fs = require('fs');
const util = require('util');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'djmh8fbwc',
    api_key: '658359227111699',
    api_secret: '2iZzJ102OwdDaiT_k1_MlLSkwpA',
    secure: true,
});

//promisify the fs module functions
const mkdirAsync = util.promisify(fs.mkdir);
const writeFileAsync = util.promisify(fs.writeFile);
const readFileAsync = util.promisify(fs.readFile);

//multer
// const storage = multer.memoryStorag;
const upload = multer({
    dest: './uploads',
});

router.get('/', async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: 'Unauthorized user' });
            return;
        }
        console.log(req.userId);

        console.log('GET----------------------');
        const id = req.userId;

        const user = await User.findOne({ _id: id }).select('-password');
        const { name, gender, aboutMe, country, dob, count, avtar } = user;

        const userInfo = { name, gender, aboutMe, country, dob, count, avtar };
        console.log(userInfo);

        //avtar sending logic
        // if (user.avtarUrl) {
        // 	const avtar = await readFileAsync(user.avtarUrl);
        // 	// const stream = fs.createReadStream(user.avtarUrl);
        // 	// console.log(avtar);
        // 	userInfo['avtar'] = avtar;
        // }

        console.log('----------------------GET');
        res.status(200).json({ user: userInfo });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

router.put('/', upload.single('avtar'), async (req, res) => {
    try {
        const id = req.userId;
        const { name, gender, dob, country, aboutMe } = req.body;
        const avtar = req.file;
        console.log(avtar);

        const user = await User.findOne({ _id: id }).select('-password');

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
        if (!avtar) {
            await user.save();
            console.log('user', user);

            res.status(200).json({ user: user });
            return;
        }
        console.log('avtar found', avtar);

        await cloudinary.uploader.upload(avtar.path, async (err, result) => {
            if (err) {
                res.status(500).json({ error: err });
                return;
            }
            // remove photo if it exist
            if (user.avtar && user.avtar.public_id) {
                cloudinary.uploader.destroy(
                    user.avtar.public_id,
                    (err, res) => {
                        if (err) {
                            console.log(err);
                        }
                        console.log('res');
                    }
                );
            }
            console.log(result);
            user.avtar = { avtarUrl: result.url, public_id: result.public_id };
            await user.save();

            res.status(200).json({ user: user });

            fs.unlink(avtar.path, (err) => {
                console.log(err);
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error });
    }
});

module.exports = router;
