
const express = require('express')
const app = express()
const port = 8000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

// 404 error pages
app.use(function (req, res, next) {
    res.status(404).send("This page does not exists")
})