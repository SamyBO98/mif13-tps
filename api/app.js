
const express = require('express')
const app = express()
const axios = require('axios')
const port = 3376

var token = ""

// Router modules
var api = require('./routes/api')

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Static functions in public folder
app.use('/static', express.static('public'))

app.use('/api', api)

// 404 error pages
app.use(function (req, res, next) {
    res.status(404).send("This page does not exists")
})

