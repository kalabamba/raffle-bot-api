const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = function (req, res, next) {
	const rawToken = req.header('Authorization');
	if (!rawToken) {
		return res.status(401).send({error: "Access denied. No token provided."});
	}
	try {
		const token = rawToken.split(' ')[1];
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	}
	catch (err) {
		return res.status(400).send({error: "Invalid token."});
	}
}