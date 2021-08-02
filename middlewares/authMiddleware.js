const jwt = require('jsonwebtoken');

const verifyUser = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(' ')[1];

        const decoded = jwt.verify(token, 'test');

        req.userId = decoded._id;
    } catch (error) {
        // res.status(401).json({ message: 'Unauthorized user!' });
        // return;
        console.log('Verify user error', error);
    }
    next();
};

module.exports = verifyUser;
