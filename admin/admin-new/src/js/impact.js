import { mymap } from './map.js';
/* global L */

var orangeIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Set impacts on the map
function getAllImpacts() {
    let url = "http://localhost:3376/api/resources/impacts";

    let init = {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        cache: 'default'
    };

    let request = new Request(url);

    fetch(request, init)
        .then(resp => resp.json())
        .then(impact => {

            for (const id of Object.keys(impact)) {

                //marker for impacts
                L.marker([impact[id].position[0], impact[id].position[1]], { icon: orangeIcon })
                    .addTo(mymap)
                    .bindPopup(`Météorite de type <strong>${impact[id].composition}</strong>.<br>TTL restant: <strong>${impact[id].ttl}</strong>s.`);


                console.log(`Composition: ${impact[id].composition}, position: [${impact[id].position[0]}, ${impact[id].position[1]}], ttl: ${impact[id].ttl}`);

            }
        }).catch(error => {
            console.log(error);
        })
} export default getAllImpacts;