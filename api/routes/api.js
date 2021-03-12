var express = require('express')
var router = express.Router()

// Middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

// Define the home page route
router.get('/', function (req, res) {
    res.send('API home page')
})

// Define the resources route
router.get('/resources', function (req, res) {
    res.send('truc')
})

module.exports = router