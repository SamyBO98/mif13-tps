
const express = require('express')
const bodyParser = require('body-parser')
var cors = require('cors');
const app = express()
const port = 3376
const path = require('path');

// Router modules
var api = require('./api')
var admin = require('./admin')

// cors
app.use(cors());

// ejs
app.set('view engine', 'ejs')

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

//express page
app.get('/', function (req, res) {
  res.render('pages/index');
})

//router api
app.use('/api', api)

//router admin
app.use('/admin', admin)

// 404 error pages
app.use(function (req, res, next) {
  res.status(404).send("This page does not exists")
})