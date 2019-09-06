const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
//Import Routes
const characterRoute = require('./routes/character');

var PORT = process.env.PORT || 3000;

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

app.listen(PORT, () => console.log('Server up and running!'));
