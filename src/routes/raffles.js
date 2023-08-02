const express = require('express');
const router = express.Router();

const { Raffle, validateRaffle} = require('../models/raffle');



router.get('/', async (req, res) => {
	try {
		const raffles = await Raffle.find();
		if (!raffles) {
			return res.status(404).send({ error: "No raffles found."});
		}
		res.send(raffles);
	}
	catch (err) {
		console.log(err);
	}	
});

router.get('/:id', async (req, res) => {
	try {
		if (req.params.id.length != 24) {
			return res.status(400).send({ error: "id must be 24 characters long"});
		}
		const raffle = await Raffle.findById(req.params.id);
		if (!raffle) {
			return res.status(404).send({ error: "The raffle with the given ID was not found."});
		}
		res.send(raffle);
	}catch (err) {
		console.log(err);
	}
});
router.post('/', async (req, res) => {
	try {
		if (req.body._id || req.body.__v) {
			return res.status(400).send({ error: "_id and __v must not be included in the request body" });
		}
		const { error } = validateRaffle(req.body);
		if ( error ) {
			return res.status(400).send({ error: error.details[0].message });
		}
		const raffle = new Raffle({
			raffleGuildId : req.body.raffleGuildId,
			raffleChannelId : req.body.raffleChannelId,
			raffleMsgId: req.body.raffleMsgId,
			raffleDetails: {
				description: req.body.raffleDetails.description,
				prize: req.body.raffleDetails.prize,
				creatorId: req.body.raffleDetails.creatorId
			},
			createdDate: req.body.createdDate,
			endDate: req.body.endDate,
			winnerCount : req.body.winnerCount,
		});
		await raffle.save();
		res.status(201).send(raffle);
	}
	catch (err) {
		console.log(err);
	}
});
router.put('/:id', async(req, res) => {
	try {
		if (req.params.id.length != 24) {
			return res.status(400).send({ error: "id must be 24 characters long" });
		}
		const { error } = validateRaffle(req.body);
		if ( error ) {
			return res.status(400).send({ error: error.details[0].message });
		}
		const raffle = await Raffle.findById(req.params.id);
		if (!raffle) {
			return res.status(404).send({ error: "The raffle with the given ID was not found." });
		}
		raffle.raffleGuildId = req.body.raffleGuildId;
		raffle.raffleChannelId = req.body.raffleChannelId;
		raffle.raffleMsgId = req.body.raffleMsgId;
		raffle.raffleDetails = req.body.raffleDetails;
		raffle.createdDate = req.body.createdDate;
		raffle.endDate = req.body.endDate;
		raffle.isActive = req.body.isActive;
		raffle.winnerCount = req.body.winnerCount;
		raffle.winners = req.body.winners;
		raffle.backups = req.body.backups;
		const updatedRaffle = await raffle.save();
		res.send(updatedRaffle);
	}
	catch (err) {
		console.log(err);
	}
});
router.delete('/:id', async (req, res) => {
	try {
		if (req.params.id.length != 24) {
			return res.status(400).send({ error: "id must be 24 characters long" });
		}
		const raffle = await Raffle.findById(req.params.id);
		if (!raffle) {
			return res.status(404).send({ error: "The raffle with the given ID was not found." })
		}
		await Raffle.deleteOne(raffle);
		res.status(200).send(raffle);
	}
	catch (err) {
		console.log(err);
	}
});

module.exports = router;