var express = require('express')
var router = express.Router()
var axios = require('axios')
var fs = require('fs')

// Call classes
var Authenticate = JSON.parse(fs.readFileSync('routes/authenticate.json', 'utf-8'))
var userClass = require('./classes/User')
var latLngClass = require('./classes/LatLng')
var geoResources = require('./classes/GeoResources').class
var zrr = require('./classes/Zrr').class

// Middleware that is specific to this router
router.use(function timeLog (req, res, next) {
    // Launch authenticate function
    axios.get('https://proxy-tps-m1if13-2019.univ-lyon1.fr/118/v1/authenticate', {
        params: {
            token: Authenticate.token,
            origin: Authenticate.origin
        }
    }).then(response => {
        //next()
    }).catch(error => {
        //res.status(401).send('Authentication failed')
    })
    next()
})

router.get('/add', function(req, res) {

    var user = new userClass.class(
        "otman", 
        "https://img-31.ccm2.net/gErGuHhHKhHj1dWOgTQZ087xi-E=/1240x/smart/0303393db20f42cfae31ed12d4fc2c0d/ccmcms-hugo/10601961.jpg", 
        new latLngClass.class(4, 8),
        180
    );

    geoResources.add(user);
    res.send(200);
})

router.get('/', function (req, res) {
    res.send(geoResources.getAll());
})

// Create a zrr
router.post('/create', function (req, res) {
    let lat1 = req.body.lat1;
    let lon1 = req.body.lng1;
    let lat2 = req.body.lat2;
    let lon2 = req.body.lng2;
    
    let corner1 = new latLngClass.class(lat1, lon1);
    let corner2 = new latLngClass.class(lat2, lon2);

    zrr.add(corner1.getLatLng(), corner2.getLatLng());
    res.status(204).send('Successful operation');
})

// Create a zrr
router.get('/zrr', function (req, res) {
    res.send(zrr.getAll());
})

// Create an impact (post)
router.post('/:idGame/meteorite', function (req, res) {
    res.send('Meteorite')
})

// Create a game (post)
router.get('/:idresources/infos', function (req, res) {
    res.send('Infos')
})

// Create a game (post)
router.post('/annonce', function (req, res) {
    res.send('Annonce')
})

module.exports = router