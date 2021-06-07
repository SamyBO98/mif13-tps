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
var Authenticate = JSON.parse(fs.readFileSync('./authenticate.json', 'utf-8'))

// create application/json parser
var jsonParser = bodyParser.json()

// Middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    if (req.headers.authorization) {
        var authorization = req.headers.authorization;
        var origin = "http://192.168.75.118";

        axios.get("http://192.168.75.118:8080/v1/authenticate", {
            params: {
                token: authorization,
                origin: origin
            }
        }).then(() => {
            next();
        }).catch(error => {
            return res.status(401).send(error);
        });
    } else {
        return res.status(403).send("Votre requête n'a pas détecté de token stocké dans le header.");
    }
})

// Get all living resources
router.get('/', function (req, res) {
    res.send("Ceci est un message confirmant que l'url fonctionne :o");
})

// Get all resources
router.get('/resources', function (req, res) {
    res.send(geoResources.getAll());
})

// Get all players
router.get('/players', function(req, res) {
    res.send(geoResources.getPlayers());
})

// Get all located players
router.get('/players', function(req, res) {
    res.send(geoResources.getLocatedPlayers());
})

// Get all zrr
router.get('/zrr', function (req, res) {
    res.send(zrr.getAll());
})

// Get user
router.get('/user/:login', function(req, res) {
    const login = req.params.login;

    let resources = geoResources.getAll();
    for (const id of Object.keys(resources)) {
        if (resources[id].role === "player" && resources[id].login === login) {
            return res.send(resources[id]);
        }
    }
    return res.status(404).send('User not found in the game');
})

// Update user's position
router.put('/resources/:userId/position', jsonParser, function (req, res) {
    const login = req.params.userId;
    const position = req.body.position;

    let users = geoResources.getAll();
    for (const id of Object.keys(users)) {
        if (users[id].role === "player" && users[id].login === login) {
            users[id].setPosition([position[0], position[1]]);
            res.status(204).send('Successful operation');
        }
    }

    res.status(404).send('User not found');

})

// Update user's image
router.put('/resources/:userId/image', jsonParser, function (req, res) {
    const login = req.params.userId;
    const url = req.body.url;

    let users = geoResources.getAll();
    for (const id of Object.keys(users)) {
        if (users[id].role === "player" && users[id].login === login) {
            users[id].setImage(url);
            res.status(204).send('Successful operation');
        }
    }

    res.status(404).send('User not found');
})

// Set the meteorite captured by an user (captured by a user)
router.put('/capture/:impactId', jsonParser, function (req, res) {
    const impactId = req.params.impactId;
    const login = res.body.login;

    // make sure the user exists
    axios.get(`/user/${login}`).then(() => {

        let impact = geoResources.getImpact(impactId);

        if (impact == null){
            res.status(404).send('La météorite est introuvable');
        } else {
            if (impact.isCaptured()){
                res.status(400).send('La météorite à déja été capturée par un joueur');
            } else {
                impact.setCapturedBy(login);
                res.status(204).send('Successful operation');
            }
        }

    }).catch((error) => {
        res.status(404).send('User not found in the request of the impact');
    })
})

module.exports = router