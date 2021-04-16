<template>
  <div class="main-title">
    <h1>Page d'accueil</h1>
    <h3>Vous avez accès à la carte</h3>
    <h4>Une fois connecté(e), la carte sera centrée sur votre position</h4>
  </div>

  <section>
    <p class="content">
      <strong>Carte</strong>
    </p>
    <div id="map" class="map"></div>
  </section>
</template>

<script>
import "leaflet/dist/leaflet.css";
import axios from "axios";

// This part resolves an issue where the markers would not appear in webpack
import { Icon } from "leaflet";
delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// initialisation de la map
let lat = 45.782,
  lng = 4.8656,
  zoom = 19;
let mymap = {};

export default {
  name: "Map",
  methods: {
    // ProcÃ©dure de mise Ã  jour de la map
    updateMap: function () {
      // Affichage Ã  la nouvelle position
      mymap.setView([lat, lng], zoom);

      // La fonction de validation du formulaire renvoie false pour bloquer le rechargement de la page.
      return false;
    },
  },
  async beforeMount() {
    console.log("call the function");
    // HERE is where to load Leaflet components!
    const L = await import("leaflet");
    // ProcÃ©dure d'initialisation
    mymap = L.map("map", {
      center: [lat, lng],
      zoom: zoom,
    });
    //updateMap();

    // CrÃ©ation d'un "tile layer" (permet l'affichage sur la carte)
    L.tileLayer(
      "https://api.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}@2x.jpg90?access_token=pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA",
      {
        maxZoom: 22,
        minZoom: 1,
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
          '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
          'Imagery Â© <a href="https://www.mapbox.com/">Mapbox</a>',
        id: "mapbox/streets-v11",
        tileSize: 512,
        zoomOffset: -1,
        accessToken:
          "pk.eyJ1IjoibTFpZjEzIiwiYSI6ImNqczBubmhyajFnMnY0YWx4c2FwMmRtbm4ifQ.O6W7HeTW3UvOVgjCiPrdsA",
      }
    ).addTo(mymap);

    // Ajout d'un marker
    L.marker([45.78207, 4.86559])
      .addTo(mymap)
      .bindPopup("EntrÃ©e du bÃ¢timent<br><strong>Nautibus</strong>.")
      .openPopup();

    // Clic sur la carte
    mymap.on("click", (e) => {
      lat = e.latlng.lat;
      lng = e.latlng.lng;
      this.updateMap();
    });
  },
  async updateDatasToMap() {
    console.log("call the function");
    // Request to get all ZRR
    axios({
      method: "get",
      url: "/express/admin/zrr",
      headers: {
        Origin: "*",
      },
    })
      .then((resp) => {
        console.log(resp);
      })
      .catch((error) => {
        console.log(error);
      });

    // Request to get all impacts

    // Request to get all players
  },
};
</script>

<style scoped>
.map {
  margin: auto;
  height: 400px;
  width: 75%;
  border: 1px solid;
}
</style>
