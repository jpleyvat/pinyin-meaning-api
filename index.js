const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const characterRoute = require('./routes/character');

dotenv.config();

//Conect toDB
mongoose.connect(
	process.env.DB_CONNECT,
	{ useNewUrlParser: true },
	() => {
		console.log('Connected to db!!!!');
	}
);

// Middleware
app.use(express.json());

//Route Middlewares
app.use('/api/character', characterRoute);

app.listen(3000, () => console.log('Server up and running!'));
