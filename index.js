require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

const raffles = require('./routes/raffles');
const home = require('./routes/home');
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});
app.use('/', home);
app.use('/api/raffles', raffles);

(async () => {
	
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Connected to MongoDB...');
	}
	catch (err) {
		console.log(err);
	}	
})();
app.listen(process.env.PORT, () => {
	console.log(`Server listening on port 3000`);
});