var express = require('express')
var router = express.Router()
var axios = require('axios')
var map = [];

var Role = {
    PLAYER: "player",
    IMPACT: "impact"
}

// Call classes
var geoResources = require('./classes/GeoResources')
var latLng = require('./classes/LatLng')

let id1 = "otman-le-rigolo"
let url1 = "https://192.168.75.118/api/v1/users/otman-le-rigolo/avatar.png"
let position1 = new latLng.class(10, 4).getLatLng()
let role1 = Role.PLAYER
let ttl1 = 67
let trophys1 = ["truc", "oui"]
let geo1 = new geoResources.class(id1, url1, position1, role1, ttl1, trophys1)

let id2 = "asterote"
let url2 = "https://192.168.75.118/api/v1/users/asterote/avatar.png"
let position2 = new latLng.class(2, 1).getLatLng()
let role2 = Role.IMPACT
let ttl2 = 89
let trophys2 = ["tertoe"]
let geo2 = new geoResources.class(id2, url2, position2, role2, ttl2, trophys2)

map.push(geo1)
map.push(geo2)

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
    res.send(map)
})

module.exports = router