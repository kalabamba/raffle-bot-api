const jwt = require('jsonwebtoken');
require('dotenv').config();
module.exports = function (req, res, next) {
	const token = req.header('Authorization').split(' ')[1];
	if (!token) {
		return res.status(401).send({error: "Access denied. No token provided."});
	}
	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded;
		next();
	}
	catch (err) {
		return res.status(400).send({error: "Invalid token."});
	}
}