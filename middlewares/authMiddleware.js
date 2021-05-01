const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
	try {
		const token = req.headers['authorization'].split(' ')[1];
		const decoded = await jwt.verify(token, 'test');

		req.userId = decoded._id;
	} catch (error) {
		res.status(401).json({ message: 'Unauthorized user!' });
	}
	next();
};

module.exports = verifyUser;
