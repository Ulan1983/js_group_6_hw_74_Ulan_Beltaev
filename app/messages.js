const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = './messages';

router.post('/', (req, res) => {
	const date = new Date().toISOString();
	const fileName = `./messages/${date}.txt`;

	const message = {
		message: req.body.message,
		datetime: date
	};

	const data = JSON.stringify(message);

	fs.writeFile(fileName, data, err => {
		if (err) {
			console.error(err);
		} else {
			console.log('File was saved!');
			res.send(message);
		}
	});
});

router.get('/', (req, res) => {
	fs.readdir(path, (err, files) => {
		let messages = [];
		files = files.slice(-5);
		files.reverse().forEach(file => {
			const oneFile = fs.readFileSync(`${path}/${file}`);
			messages.push(JSON.parse(oneFile));
		});
		res.send(messages);
	});
});


module.exports = router;