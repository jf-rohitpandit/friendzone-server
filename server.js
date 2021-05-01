const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const auth = require('./routes/auth');
const home = require('./routes/home');
const profile = require('./routes/profile');
const friend = require('./routes/friend');
const verifyUser = require('./middlewares/authMiddleware');

const app = express();
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./db.js');

const PORT = 5000;

app.get('/', (req, res) => {
	res.json({ msg: 'hi' });
});

app.use('/auth', auth);
app.use('/home', verifyUser, home);
app.use('/profile', verifyUser, profile);
app.use('/friend', verifyUser, friend);

app.get('*', (req, res) => {
	res.status(404).send('Page not Found');
});

app.listen(PORT, () => {
	console.log(`server live at port: ${PORT}`);
});
