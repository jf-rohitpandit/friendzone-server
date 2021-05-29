const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
	try {
		const token = req.headers['authorization'].split(' ')[1];
		console.log('token', req.headers['authorization']);
		console.log('token', token);
		const decoded = jwt.verify(token, 'test');
		console.log('decoded', decoded);

		req.userId = decoded._id;
	} catch (error) {
		// res.status(401).json({ message: 'Unauthorized user!' });
		// return;
		console.log('Verify user error', error);
	}
	next();
};

module.exports = verifyUser;
