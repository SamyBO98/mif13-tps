// initialisation de la map
let zoom = 10;
let myPosition = null;

let mymap = L.map('map', {
    center: [45.782, 4.8656],
    zoom: zoom
});

// Création d'un "tile layer" (permet l'affichage sur la carte)
L.tileLayer('https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA', {
		maxZoom: 22,
		minZoom: 1,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox/streets-v11',
		tileSize: 512,
		zoomOffset: -1,
		accessToken: 'pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA'
	}).addTo(mymap);

function showMap(position) {
	// Ajout d'un marker
	if (myPosition !== null) myPosition.remove(mymap);
	let lat = position.coords.latitude;
	let lng = position.coords.longitude;

	myPosition = L.marker([lat, lng]).addTo(mymap).bindPopup('<strong>Votre position</strong>').openPopup();

	// Affichage à la nouvelle position
	mymap.setView([lat, lng]);

	document.getElementById("geolocalisation").innerHTML = "COORDINATES: [" + lat + ", " + lng + "]";
	navigator.vibrate([500, 100, 500]);

	return false;
}

function errorMap(error) {
	document.getElementById("errorGeolocalisation").innerHTML = "ERROR: " + error;
}

// Mise à jour de la map
function updateMap() {
	navigator.geolocation.getCurrentPosition(showMap);

	// La fonction de validation du formulaire renvoie false pour bloquer le rechargement de la page.
	return false;
}

var watchId = navigator.geolocation.watchPosition(showMap, errorMap, { timeout: 20000 });
//setInterval(updateMap, 5000);