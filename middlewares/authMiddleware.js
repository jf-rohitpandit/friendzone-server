const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
	try {
		console.log(req.headers['authorization']);
		const token = req.headers['authorization'];
		const decoded = await jwt.verify(token, 'test');
		console.log(decoded);
		req.userId = decoded._id;
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized user!' });
	}
	next();
};

module.exports = verifyUser;
