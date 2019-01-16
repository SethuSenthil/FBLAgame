const express = require('express');
const app = express();
const opn = require('opn');
const PORT =  process.env.PORT || 2343;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.use(express.static(__dirname));

app.listen(PORT, () => console.log(`Server Running...`));
opn('localhost:2343', {app: ['google chrome', '--incognito']});
