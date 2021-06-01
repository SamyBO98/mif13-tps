var express = require('express')
var router = express.Router()
var axios = require('axios')
var fs = require('fs')

// Call classes
var Authenticate = JSON.parse(fs.readFileSync('./authenticate.json', 'utf-8'))
var userClass = require('./classes/User')
var latLngClass = require('./classes/LatLng')
var meteoriteClass = require('./classes/Meteorite')
var geoResources = require('./classes/GeoResources').class
var zrr = require('./classes/Zrr').class
var idImpact = 0

// MOCK OBJECT: REQUETE VERS SPRING POUR RECUPERER TOUT LES UTILISATEURS ET ON LES INITIALISE PAR DEFAUT
axios.get("http://192.168.75.118:8080/v1/users").then(resp => {
    console.log(resp.data);
  for (user in resp.data) {
    var newUser = new userClass.class(
        resp.data[user], null, null, 60
    );
    geoResources.add(newUser);
  }
}).catch(error => {
  console.log(error);
});


// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    next()
})

//spa
router.use(express.static('public'));
router.get('/', function (req, res) {
    res.sendFile(__dirname + `/public/admin.html`);
})

// Create a zrr
router.post('/zrr', function (req, res) {
    let lat1 = req.body.lat1;
    let lon1 = req.body.lng1;
    let lat2 = req.body.lat2;
    let lon2 = req.body.lng2;

    // Check if missing argument
    if (lat1 === undefined || lat1 === null){
        res.status(400).send("Missing argument");
        return;
    }
    if (lon1 === undefined || lon1 === null){
        res.status(400).send("Missing argument");
        return;
    }
    if (lat2 === undefined || lat2 === null){
        res.status(400).send("Missing argument");
        return;
    }
    if (lon2 === undefined || lon2 === null){
        res.status(400).send("Missing argument");
        return;
    }

    let corner1 = new latLngClass.class(1.0 * lat1, 1.0 * lon1);
    let corner2 = new latLngClass.class(1.0 * lat2, 1.0 * lon2);

    zrr.add(corner1.getLatLng(), corner2.getLatLng());

    res.status(204).send("Successful operation");
})


// Create an impact
router.post('/impact', function (req, res) {
    let lat = req.body.lat;
    let lng = req.body.lng;
    let type = req.body.type;
    let ttl = req.body.ttl;

    // Check if missing argument
    if (lng === undefined || lng === null){
        res.status(400).send("Missing argument");
        return;
    }
    if (lat === undefined || lat === null){
        res.status(400).send("Missing argument");
        return;
    }
    if (type === undefined || type === null){
        res.status(400).send("Missing argument");
        return;
    }
    if (ttl === undefined || ttl === null){
        res.status(400).send("Missing argument");
        return;
    }

    let meteorite = new meteoriteClass.class(
        idImpact,
        new latLngClass.class(1.0 * lat, 1.0 * lng).getLatLng(),
        String(type),
        1 * ttl
    );
    
    geoResources.add(meteorite);

    idImpact++;

    res.status(204).send("Succesfull operation");
})

// Add existing player
router.post('/player', function (req, res) {
    let login = req.body.login;
    let imageUrl = req.body.imageUrl;
    let lat = req.body.lat;
    let lng = req.body.lng;
    let ttl = req.body.ttl;

    // Check if missing argument
    if (login === undefined || login === null){
        res.status(400).send("Missing argument");
        return;
    }
    if (imageUrl === undefined || imageUrl === null){
        res.status(400).send("Missing argument");
        return;
    }
    if (lat === undefined || lat === null){
        res.status(400).send("Missing argument");
        return;
    }
    if (lng === undefined || lng === null){
        res.status(400).send("Missing argument");
        return;
    }
    if (ttl === undefined || ttl === null){
        res.status(400).send("Missing argument");
        return;
    }

    //TODO after: launch request for spring to get all users and check if this one exists
    //

    // Check if user already exists
    let datas = geoResources.getAll();
    for (const id of Object.keys(datas)) {
        if (datas[id].role === "player" && datas[id].login === login) {
            res.status(409).send("User already exists");
            return;
        }
    }

    // Create player
    let player = new userClass.class(
        String(login),
        String(imageUrl),
        new latLngClass.class(1.0 * lat, 1.0 * lng).getLatLng(),
        1 * ttl
    );

    geoResources.add(player);

    res.status(204).send("Succesfull operation");
})

// Get all players from resources
router.get('/resources/users', function (req, res) {
    let users = new Array();
    let datas = geoResources.getAll();
    for (const id of Object.keys(datas)) {
        if (datas[id].role === "player") {
            users.push(datas[id]);
        }
    }
    res.send(users);
})

// Get all impacts from resources
router.get('/resources/impacts', function (req, res) {
    let impacts = new Array();
    let datas = geoResources.getAll();
    for (const id of Object.keys(datas)) {
        if (datas[id].role === "impact") {
            impacts.push(datas[id]);
        }
    }
    res.send(impacts);
})

// Get all zrr
router.get('/zrr', function (req, res) {
    res.send(zrr.getAll());
})

module.exports = router