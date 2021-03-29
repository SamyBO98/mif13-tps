// initialisation de la map
let lat = 45.782, lng = 4.8656, zoom = 20;
let lat1 = null, lng1 = null, lat2 = null, lng2 = null;
let coord1 = null, coord2 = null;

var greenIcon = new L.Icon({
	iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
	popupAnchor: [1, -34],
	shadowSize: [41, 41]
});

let mymap = L.map('map', {
	center: [lat, lng],
	zoom: zoom
});
//updateMap();

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

// Ajout d'un marker
L.marker([45.78207, 4.86559]).addTo(mymap).bindPopup('Entrée du bâtiment<br><strong>Nautibus</strong>.').openPopup();

// En cas de rechargement: récupération des zrr existants
getAllZrr();

// Clic sur la carte
mymap.on('click', e => {
	if (lat1 == null && lng1 == null) {
		lat1 = e.latlng.lat;
		lng1 = e.latlng.lng;
		coord1 = L.marker([lat1, lng1], { icon: greenIcon });
		coord1.addTo(mymap);
	} else {
		lat2 = e.latlng.lat;
		lng2 = e.latlng.lng;
		coord2 = L.marker([lat2, lng2], { icon: greenIcon });
		coord2.addTo(mymap);
		createZrr();
		lat1 = null;
		lng1 = null;
		lat2 = null;
		lng2 = null;
	}

	lat = e.latlng.lat;
	lng = e.latlng.lng;
	updateMap();
});

// Mise à jour de la map
function updateMap() {
	// Affichage à la nouvelle position
	mymap.setView([lat, lng], zoom);

	// La fonction de validation du formulaire renvoie false pour bloquer le rechargement de la page.
	return false;
}

// Création d'une zrr côté serveur
function createZrr() {
	let url = `http://localhost:3376/admin/create`;

	let datas = {
		lat1: lat1,
		lng1: lng1,
		lat2: lat2,
		lng2: lng2
	};

	const co1 = coord1;
	const co2 = coord2;

	let init = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify(datas)
	};

	let request = new Request(url)

	fetch(request, init)
		.then(resp => {
			L.rectangle([[datas.lat1, datas.lng1], [datas.lat2, datas.lng2]], { color: '#FF0000', weight: 1 }).addTo(mymap);
			co1.remove();
			co2.remove();
		}).catch(error => {
			console.log(error);
		})
}

function getAllZrr() {
	let url = "http://localhost:3376/admin/zrr";

	let init = {
		method: 'GET',
		headers: { 'Accept': 'application/json' },
		mode: 'cors',
		cache: 'default'
	};
	let request = new Request(url)

	fetch(request, init)
		.then(resp => resp.json())
		.then(zrr => {
			for (const id of Object.keys(zrr)) {
				L.rectangle([[zrr[id].corner1[0], zrr[id].corner1[1]], [zrr[id].corner2[0], zrr[id].corner2[1]]], { color: '#FF0000', weight: 1 }).addTo(mymap);
			}
		}).catch(error => {
			console.log(error);
		})
}