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
function getParameters(){
	// Send meteorite
	if (getUrlParameter('sendMeteor') !== undefined){
		sendMeteorite(getUrlParameter('latMeteor'), getUrlParameter('lonMeteor'), getUrlParameter('meteorType'), getUrlParameter('ttlMeteor'));
	}

	// Create ZRR
	if (getUrlParameter('sendZrr') !== undefined){
		createZrr(getUrlParameter('lat1'), getUrlParameter('lon1'), getUrlParameter('lat2'), getUrlParameter('lon2'));
	}

	getAllZrr();
	updateMapAndUser();
}

function sendMeteorite(lat, lon, type, ttl){

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

	fetch(request, init);
}

function createZrr(lat1, lon1, lat2, lon2){
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

	fetch(request, init);
}


