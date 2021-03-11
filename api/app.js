
const express = require('express')
const app = express()
const port = 3376

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Static functions in public folder
app.use('/static', express.static('public'))

// 404 error pages
app.use(function (req, res, next) {
    res.status(404).send("This page does not exists")
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

