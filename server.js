const express = require('express');
const app = express();

const PORT = 5000;

app.get('/', (req, res) => {
	res.json({ msg: 'hi' });
});

app.listen(PORT, () => {
	console.log(`server live at port: ${PORT}`);
});
