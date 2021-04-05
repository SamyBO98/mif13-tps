/* eslint-env jquery */
import "../css/style.css";

import getAllZrr from './map.js';
import getAllPlayers from './user.js';
import getAllImpacts from './impact.js';
/**
 * Get parameter from the url
 */
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

/**
 * Function called each time the page is loaded: get parameters from the url
 */
$(document).ready(function () { 
    launchRequests.then(() => {
        getAllZrr();
        getAllPlayers();
        getAllImpacts();
    });
});

// Promise
const launchRequests = new Promise((res) => {
    // Send meteorite
    if (getUrlParameter('sendMeteor') !== undefined) {
        sendMeteorite(getUrlParameter('latMeteor'), getUrlParameter('lonMeteor'), getUrlParameter('meteorType'), getUrlParameter('ttlMeteor'))
            .then(() => {
                res();
            });
    }

    // Create ZRR
    else if (getUrlParameter('sendZrr') !== undefined) {
        createZrr(getUrlParameter('lat1'), getUrlParameter('lon1'), getUrlParameter('lat2'), getUrlParameter('lon2'))
            .then(() => {
                res();
            });
    }

    // Create player
    else if (getUrlParameter('addUser') !== undefined) {
        createUser(getUrlParameter('loginPlayer'), getUrlParameter('imagePlayer'), getUrlParameter('latPlayer'), getUrlParameter('lonPlayer'), getUrlParameter('ttlPlayer'))
            .then(() => {
                res();
            });

    } else {
        res();
    }

});

function sendMeteorite(lat, lon, type, ttl) {

    return new Promise(function (res) {
        let url = "http://localhost:3376/admin/impact";

        let datas = {
            lat: lat,
            lng: lon,
            type: type,
            ttl: ttl
        };

        let init = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(datas)
        };

        let request = new Request(url);

        fetch(request, init)
            .then(() => {
                res(true);
            });
    });

}

function createZrr(lat1, lon1, lat2, lon2) {

    return new Promise(function (res) {
        let url = `http://localhost:3376/admin/zrr`;

        let datas = {
            lat1: lat1,
            lng1: lon1,
            lat2: lat2,
            lng2: lon2
        };

        let init = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(datas)
        };

        let request = new Request(url)
 
        fetch(request, init)
            .then(() => {
                res(true);
            });
    });

}

function createUser(login, image, lat, lon, ttl) {

    return new Promise(function (res) {
        let url = `http://localhost:3376/admin/player`;

        let datas = {
            login: login,
            imageUrl: image,
            lat: lat,
            lng: lon,
            ttl: ttl
        };

        let init = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            mode: 'cors',
            cache: 'default',
            body: JSON.stringify(datas)
        };

        let request = new Request(url)

        fetch(request, init)
            .then(() => {
                res(true);
            });
    });

}


