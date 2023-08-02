// dependencies
require('dotenv').config();
const express = require('express');
const morgan = require('morgan')
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
//routes 
const raffles = require('./routes/raffles');
const home = require('./routes/home');
//import swagger docs
const docs = require('./docs');
//app configs
app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(cors());
app.use('/', home);
app.use('/api/raffles', raffles);
app.use('/api-docs',swaggerUI.serve,swaggerUI.setup(docs));

// connect to mongodb
(async () => {
	
	try {
		await mongoose.connect(process.env.MONGO_URI);
		console.log('Connected to MongoDB...');
	}
	catch (err) {
		console.log(err);
	}	
})();

// start server
app.listen(process.env.PORT, () => {
	console.log(`Server listening on port ${process.env.PORT}`);
});