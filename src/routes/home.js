const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.status(403).send({error:'Access denied.'});
	});
module.exports = router;