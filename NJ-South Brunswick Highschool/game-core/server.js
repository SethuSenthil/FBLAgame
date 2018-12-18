const express = require('express')
const app = express()
const port = 2343

app.get('/', (req, res) => res.sendFile(__dirname + '/index.html'))
app.use(express.static(__dirname));

app.listen(port, () => console.log(`Server Running...`))