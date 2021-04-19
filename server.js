const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const auth = require('./routes/auth');

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

app.listen(PORT, () => {
	console.log(`server live at port: ${PORT}`);
});
