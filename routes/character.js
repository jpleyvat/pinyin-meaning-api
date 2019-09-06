const router = require('express').Router();
const Character = require('../model/Character');
const fetch = require('node-fetch');

router.post('/', async (req, res) => {
	// Checking if the character is already in the database
	const characterExists = await Character.findOne({
		hanzi: req.body.hanzi
	});
	if (characterExists) {
		console.log(characterExists);
		return res.json(characterExists);
	}

	// Create new character
	var pinyin;
	var meaning;
	var encoded = new Buffer.from(req.body.hanzi).toString('hex');
	encoded =
		'%' +
		encoded[0] +
		encoded[1] +
		'%' +
		encoded[2] +
		encoded[3] +
		'%' +
		encoded[4] +
		encoded[5];

	const fetchData = async () => {
		fetch(
			'https://glosbe.com/transliteration/api?from=Han&dest=Latin&text=' +
				encoded +
				'&format=json'
		)
			.then(function(response) {
				return response.json();
			})
			.then(function(myJson) {
				pinyin = myJson.text;
				fetch(
					'https://www.googleapis.com/language/translate/v2/?target=en&q=' +
						encoded +
						'&key=AIzaSyBmSLZ2bu7xgdwzz7lEVDwHikyaLXQJYNA'
				)
					.then(function(response) {
						return response.json();
					})
					.then(function(myJson) {
						meaning =
							myJson.data.translations[0]
								.translatedText;
					})
					.then(async () => {
						const character = await Character.create({
							hanzi: req.body.hanzi,
							pinyin: pinyin,
							meaning: meaning
						});
						try {
							const savedUser = character.save();
							res.send(
								await Character.findOne({
									hanzi: req.body.hanzi
								})
							);
						} catch (err) {
							res.status(400).send(err);
						}
					});
			});
	};
	fetchData();
});
module.exports = router;
