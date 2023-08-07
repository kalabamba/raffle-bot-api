const mongoose = require('mongoose');
const Joi = require('joi');

// Schema for Raffle
const raffleSchema = new mongoose.Schema({
	raffleGuildId: String,
	raffleChannelId: String,
	raffleMsgId: String,
	raffleDetails: {
		description: String,
		prize: String,
		creatorId: String
	},
	createdDate: { type: Date, default: Date.now},
	endDate: Date,
	isActive: {type: Boolean, default: true},
	winnerCount: Number,
	winners: {type: Array, default: []},
	backups: {type: Array, default: []}
});
// Model for Raffle
const Raffle = mongoose.model('Raffle', raffleSchema);

// Validation for Raffles
const validateRaffleCreate = (raffle) => {
	const schema = Joi.object({
		raffleGuildId: Joi.string().required().min(1),
		raffleChannelId: Joi.string().required().min(1),
		raffleMsgId: Joi.string().required().min(1),
		raffleDetails: Joi.object({
			description: Joi.string().required().min(1),
			prize: Joi.string().required().min(1),
			creatorId: Joi.string().required().min(1)
		}).required(),
		createdDate: Joi.date().required(),
		endDate: Joi.date().required(),
		winnerCount: Joi.number().required(),
	});
	const result = schema.validate(raffle);
	return result;
};
const validateRaffleUpdate = (raffle) => {
	const schema = Joi.object({
		_id: Joi.string().min(24).max(24),
		__v: Joi.number(),
		raffleGuildId: Joi.string().min(1),
		raffleChannelId: Joi.string().min(1),
		raffleMsgId: Joi.string().min(1),
		raffleDetails: Joi.object({
			description: Joi.string().min(1),
			prize: Joi.string().min(1),
			creatorId: Joi.string().min(1)
		}),
		createdDate: Joi.date(),
		endDate: Joi.date(),
		isActive: Joi.boolean(),
		winnerCount: Joi.number(),
		winners: Joi.array(),
		backups: Joi.array()
	});
	const result = schema.validate(raffle);
	return result;
};

// validate query
const validateQuery = (query) => {
	const schema = Joi.object({
		isActive: Joi.boolean(),
		raffleMsgId: Joi.string().min(1),
	});
	const result = schema.validate(query);
	return result;
};

module.exports =  {Raffle, validateRaffleCreate, validateRaffleUpdate, validateQuery}