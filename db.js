const mongoose = require('mongoose');

mongoose.connect('', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

const db = mongoose.connnection;

db.on('error', () => {
	console.log('mongoose connection error');
});

db.once('open', () => {
	console.log('db connected');
});
