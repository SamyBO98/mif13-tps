var express = require('express')
var router = express.Router()
var axios = require('axios')
var fs = require('fs')
var bodyParser = require('body-parser')

// Call classes
var geoResources = require('./classes/GeoResources')
var latLng = require('./classes/LatLng')
var Authenticate = JSON.parse(fs.readFileSync('routes/authenticate.json', 'utf-8'))

// create application/json parser
var jsonParser = bodyParser.json()

// Call arrays & token (todo manually ^_^)
var map = {};

// Data mock objects
let id1 = "otman-le-rigolo"
let url1 = "https://192.168.75.118/api/v1/users/otman-le-rigolo/avatar.png"
let position1 = new latLng.class(10, 4).getLatLng()
let ttl1 = 67
let trophys1 = ["truc", "oui"]
let geo1 = new geoResources.class(id1, url1, position1, ttl1, trophys1)

let id2 = "asterote"
let url2 = "https://192.168.75.118/api/v1/users/asterote/avatar.png"
let position2 = new latLng.class(2, 1).getLatLng()
let geo2 = new geoResources.class(id2, url2, position2, null, null)

map[geo1.getId()] = geo1
map[geo2.getId()] = geo2

// Middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    // Launch authenticate function
    axios.get("https://proxy-tps-m1if13-2019.univ-lyon1.fr/118/v1/authenticate?origin=" + Authenticate.origin + "&token=" + Authenticate.token).then(response => {
        //next()
    }).catch(error => {
        //res.status(401).send('Authentication failed')
    })
    next()
})

// Get all living resources
router.get('/', function (req, res) {
    res.render('pages/index')
})

// Define the resources route
router.get('/resources', function (req, res) {
    res.send(map)
})

// Update user's position
router.put('/resources/:resourceId/position', jsonParser, function (req, res) {
    let id = req.params.resourceId;
    let body = req.body.position;

    if (map[id] !== undefined){
        if (Object.keys(body).length == 2){
            if (Number.isInteger(body[0]) && Number.isInteger(body[1])){
                if (body[0] >= 0 && body[1] >= 0){
                    let newPosition = new latLng.class(body[0], body[1]).getLatLng();
                    map[id].updatePosition(newPosition);
                    res.status(204).send('Successful operation')
                } else {
                    res.status(400).send('Invalid position object (positions)')
                }
            } else {
                res.status(400).send('Invalid position object (cast number)')
            }
        } else {
            res.status(400).send('Invalid position object (size)')
        }
    } else {
        res.status(404).send('User not found')
    }
})

// Update user's image
router.put('/resources/:resourceId/image', jsonParser, function (req, res) {
    //TODO CHANGE SOMETHING FOR URL OBJECT (MAYBE LAUNCH AN API OF AN EXISTING WEBSITE)

    let id = req.params.resourceId;
    let body = req.body.url;

    if (map[id] !== undefined){
        if (body.endsWith('.png') || body.endsWith('.jpg')){
            map[id].updateImageLocation(body);
            res.status(204).send('Successful operation')
        } else {
            res.status(400).send('Invalid image URL object')
        }
    } else {
        res.status(404).send('User not found')
    }
})

module.exports = router