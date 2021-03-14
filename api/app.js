
const express = require('express')
const app = express()
const port = 3376

// Router modules
var api = require('./routes/api')
var admin = require('./routes/admin')

// ejs
app.set('view engine', 'ejs')

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Static functions in public folder
app.use('/static', express.static('public'))

//router api
app.use('/api', api)

//router admin
app.use('/admin', admin)


// 404 error pages
app.use(function (req, res, next) {
    res.status(404).send("This page does not exists")
})

