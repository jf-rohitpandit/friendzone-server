const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const auth = require('./routes/auth');
const home = require('./routes/home');
const profile = require('./routes/profile');
const friend = require('./routes/friend');
const verifyUser = require('./middlewares/authMiddleware');
const http = require('http').createServer(app);
const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
// const io = require('socket.io')(http, {
// 	cors: {
// 		origin: 'https://upbeat-jepsen-ece2e7.netlify.app',
// 	},
// });
require('./db.js');

const PORT = process.env.PORT || 5000;

app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//chat logic
// io.use((socket, next) => {
// 	try {
// 		if (socket.handshake.query && socket.handshake.query.token) {
// 			const payload = jwt.verify(socket.handshake.query.token, 'test');
// 			console.log(payload._id);
// 			socket.id = payload._id;
// 			next();
// 		}
// 	} catch (error) {
// 		console.log(error);
// 		next();
// 	}
// });

// io.on('connection', (socket) => {
// 	console.log(socket.id);
// 	socket.join(socket.id);

// 	socket.on('send-message', async ({ sendTo, text }) => {
// 		console.log(text);
// 		console.log(sendTo);
// 		socket.broadcast
// 			.to(sendTo)
// 			.emit('recieve-message', { sender: socket.id, text });
// 		const user = await User.findOne({ _id: sendTo });
// 		const isFrined = user.friend.find((f) => f == socket.id);

// 		if (!isFrined) {
// 			user.friend.unshift(socket.id);
// 			await user.save();
// 		}
// 	});

// 	socket.on('disconnect', () => {
// 		console.log('disconnected');
// 	});
// });

app.use('/auth', auth);
app.use('/home', verifyUser, home);
app.use('/profile', verifyUser, profile);
app.use('/friend', verifyUser, friend);

app.get('/', (req, res) => {
	res.json({ msg: 'hi' });
});

app.get('*', (req, res) => {
	res.status(404).send('Page not Found');
});

http.listen(PORT, () => {
	console.log(`server live at port: ${PORT}`);
});
