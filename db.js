const mongoose = require('mongoose');

mongoose.connect(
	'mongodb+srv://user:user@cluster0.ef7w3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

const db = mongoose.connection;

db.on('error', () => {
	console.log('mongoose connection error');
});

db.once('open', () => {
	console.log('db connected');
});
