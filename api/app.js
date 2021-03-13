
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3376

// parse application/json
app.use(bodyParser.json())

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

