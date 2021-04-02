var express = require('express')
var router = express.Router()
var axios = require('axios')
var fs = require('fs')
var bodyParser = require('body-parser')

// Call classes
var geoResources = require('./classes/GeoResources').class
var zrr = require('./classes/Zrr').class
var latLngClass = require('./classes/LatLng')
var userClass = require('./classes/User')
var meteoriteClass = require('./classes/Meteorite')
var Authenticate = JSON.parse(fs.readFileSync('routes/authenticate.json', 'utf-8'))

// create application/json parser
var jsonParser = bodyParser.json()

// MOCK OBJECTS
/*
var user = new userClass.class(
    "otman", 
    "https://img-31.ccm2.net/gErGuHhHKhHj1dWOgTQZ087xi-E=/1240x/smart/0303393db20f42cfae31ed12d4fc2c0d/ccmcms-hugo/10601961.jpg", 
    new latLngClass.class(45.784, 4.8659).getLatLng(),
    180
);
var meteorite = new meteoriteClass.class(
    new latLngClass.class(45.780, 4.8660).getLatLng(),
    "Astra-X",
    50
);
geoResources.add(user);
geoResources.add(meteorite);
*/

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
    res.send("Yo")
})

// Get all resources
router.get('/resources', function (req, res) {
    res.send(geoResources.getAll())
})

// Get all players from resources
router.get('/resources/users', function (req, res) {
    let users = {};
    let index = 0;
    let datas = geoResources.getAll();
    for (const id of Object.keys(datas)){
        if (datas[id].role === "player"){
            users[index] = datas[id];
            index++;
        }
    }
    res.send(users);
})

// Get all impacts from resources
router.get('/resources/impacts', function (req, res) {
    let impacts = {};
    let index = 0;
    let datas = geoResources.getAll();
    for (const id of Object.keys(datas)){
        if (datas[id].role === "impact"){
            impacts[index] = datas[id];
            index++;
        }
    }
    res.send(impacts);
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