const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Schema for user
const userSchema = new mongoose.Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	isAdmin: {type: Boolean, default: false}
}, {timestamps: true});

// Method to generate auth token
userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({_id: this._id, email: this.email, createdAt: this.createdAt, updatedAt: this.updatedAt, isAdmin: this.isAdmin}, process.env.JWT_SECRET);
	return token;
}
// Model for user
const User = mongoose.model('User', userSchema);

// Validation for users
const validateUser = (user) => {
	const schema = Joi.object({
		email: Joi.string().required().email(),
		password: Joi.string().required().min(8)
	});
	const result = schema.validate(user);
	return result;
}

module.exports = {User, validateUser};