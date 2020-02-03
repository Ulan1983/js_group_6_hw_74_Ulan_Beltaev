const express = require('express');

const router = express.Router();

const fs = require('fs');

router.post('/', (req, res) => {
	const date = new Date().toISOString();
	const fileName = `./messages/${date}.txt`;

	const message = {
		message: req.body.message,
		datetime: date
	};

	const data = JSON.stringify(message);

	fs.writeFileSync(fileName, data);
	res.send(message);
});



module.exports = router;