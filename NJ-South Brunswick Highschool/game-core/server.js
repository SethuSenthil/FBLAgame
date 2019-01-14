const express = require('express');
const app = express();
const PORT =  process.env.PORT || 2343;

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.use(express.static(__dirname));

app.listen(PORT, () => console.log(`Server Running...`))