const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../middlewares/auth');
const isAdmin = require('../middlewares/isAdmin');


router.post('/register',[isAdmin], async (req, res) => {
	try {
		const { error } = validateUser(req.body);
		if (error) {
			return res.status(400).send({ error: error.details[0].message });
		}
		let user = await User.findOne({ email: req.body.email });
		console.log(user);
		if (user) {
			return res.status(400).send({ error: "User already registered." });
		}
		const hashedPassword = await bcrypt.hash(req.body.password, 10);
		user = new User({
			email: req.body.email,
			password: hashedPassword
		});
		await user.save();
		const token = user.generateAuthToken();
		const response = {_id: user._id, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt, token: token};
		res.header("Authorization", `Bearer ${token}`).send(response);
	}
	catch (err) {
		console.log(err);
	}
});
router.post('/login', async (req, res) => {
	try {
		const { error } = validateUser(req.body);
		if (error) {
			return res.status(400).send({ error: error.details[0].message });
		}
		let user = await User.findOne({ email: req.body.email });
		if (!user) {
			return res.status(400).send({ error: "Email or password is incorrect" });
		}
		const isMatch = await bcrypt.compare(req.body.password, user.password);

		if (!isMatch) {
			return res.status(400).send({ error: "Email or password is incorrect" });
		}
		const token = user.generateAuthToken();
		const response = {_id: user._id, email: user.email, createdAt: user.createdAt, updatedAt: user.updatedAt, token: token};
		res.header("Authorization", `Bearer ${token}`).send(response);
	}
	catch (err) {
		console.log(err);
	}
});

router.get('/', [auth], (req, res) => {
	res.status(200).send({});
});

module.exports = router;