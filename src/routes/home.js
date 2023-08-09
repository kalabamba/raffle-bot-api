const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/',[auth], (req, res) => {
	res.status(200).send({});
	});
module.exports = router;