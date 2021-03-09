const express = require('express')
const path = require('path')
const app = express()
const port = 3000

app.get('/static', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/test-cors.html'));
})

app.use(function(req, res, next){
    res.status(404).send("This page not exists.");
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

