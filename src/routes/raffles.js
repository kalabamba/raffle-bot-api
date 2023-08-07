const express = require('express');
const router = express.Router();
const { Raffle, validateRaffleCreate, validateRaffleUpdate, validateQuery} = require('../models/raffle');

router.get('/', async (req, res) => {
	try {
		if (Object.keys(req.query).length > 0) {
			const query = { ...req.query };
			if (req.query.hasOwnProperty("isActive")) {
				if (req.query.isActive.toLowerCase() === "true" || req.query.isActive.toLowerCase() === "false"){
					query.isActive = req.query.isActive.toLowerCase === "true" ? true : false;
				}
			}
			const { error } = validateQuery(query);
			if (error) {
				return res.status(400).send({ error: error.details[0].message });
			}
			const raffles = await Raffle.find(req.query);
			if (!raffles) {
				return res.status(404).send({ error: "No raffles found."});
			}
			res.send(raffles);
			return;
		}
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
		if (Object.keys(req.query).length > 0) {
			const query = { ...req.query };
			if (req.query.hasOwnProperty("isActive")) {
				if (req.query.isActive.toLowerCase() === "true" || req.query.isActive.toLowerCase() === "false"){
					query.isActive = req.query.isActive.toLowerCase === "true" ? true : false;
				}
			}
			const { error } = validateQuery(query);
			if (error) {
				return res.status(400).send({ error: error.details[0].message });
			}
			const raffles = await Raffle.find({_id: req.params.id, ...req.query});
			if (!raffles || raffles.length === 0) {
				return res.status(404).send({ error: "No raffles found."});
			}
			res.send(raffles);
			return;
		}
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
		const { error } = validateRaffleCreate(req.body);
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
		const { error } = validateRaffleUpdate(req.body);
		if ( error ) {
			return res.status(400).send({ error: error.details[0].message });
		}
		const raffle = await Raffle.findById(req.params.id);
		if (!raffle) {
			return res.status(404).send({ error: "The raffle with the given ID was not found." });
		}
		raffle.raffleGuildId = req.body.raffleGuildId ? req.body.raffleGuildId : raffle.raffleGuildId;
		raffle.raffleChannelId = req.body.raffleChannelId ? req.body.raffleChannelId : raffle.raffleChannelId;
		raffle.raffleMsgId = req.body.raffleMsgId ? req.body.raffleMsgId : raffle.raffleMsgId;
		raffle.raffleDetails = req.body.raffleDetails ? req.body.raffleDetails : raffle.raffleDetails;
		raffle.createdDate = req.body.createdDate ? req.body.createdDate : raffle.createdDate;
		raffle.endDate = req.body.endDate ? req.body.endDate : raffle.endDate;
		raffle.isActive = req.body.isActive !== undefined ? req.body.isActive : raffle.isActive;
		raffle.winnerCount = req.body.winnerCount ? req.body.winnerCount : raffle.winnerCount;
		raffle.winners = req.body.winners ? req.body.winners : raffle.winners;
		raffle.backups = req.body.backups ? req.body.backups : raffle.backups;
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