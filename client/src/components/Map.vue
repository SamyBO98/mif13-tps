<template>
  <div class="main-title">
    <h1>Page d'accueil</h1>
    <h3>Vous avez accès à la carte</h3>
    <h4>Une fois connecté(e), la carte sera centrée sur votre position</h4>
  </div>

  <section>
    <p class="content">
      <strong>Carte</strong>
      Il reste <strong>{{ ttl }}</strong
      >s.
      <br />
      <strong v-if="ttl === 0">Le TTL a atteint 0. Vous avez perdus!</strong>
    </p>
    <div id="map" class="map"></div>
  </section>
</template>

<script>
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { mapState, mapActions } from "vuex";

delete Icon.Default.prototype._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

// initialisation de la map
let lat = null,
  lng = null,
  zoom = 19;
let tempPlayerMarker = null;
let playerMarker = null;
let mymap = {};

export default {
  name: "Map",
  computed: mapState({
    position: (state) => state.playerPosition,
    zrr: (state) => state.zrr,
    ttl: (state) => state.ttl,
    impacts: (state) => state.impacts,
  }),
  methods: {
    ...mapActions([
      "updatePlayerPositions",
      "decreaseTtlAction",
      "getAllZrrAndImpacts",
    ]),
    updateMap: function (L, greenIcon) {
      // Mise à jour du marqueur temporaire pour indiquer au joueur sa nouvelle coordonnées temporaire (avant l'envoi des coordonnées au serveur)
      if (tempPlayerMarker != null) tempPlayerMarker.remove(mymap);
      tempPlayerMarker = L.marker([lat, lng], { icon: greenIcon })
        .addTo(mymap)
        .bindPopup("Votre coordonnée temporaire")
        .openPopup();

      // Affichage Ã  la nouvelle position
      mymap.setView([lat, lng], zoom);

      // La fonction de validation du formulaire renvoie false pour bloquer le rechargement de la page.
      return false;
    },
    updatePlayerPosition(L, greenIcon) {
      if (lat !== null && lng !== null && this.ttl > 0) {
        this.updatePlayerPositions([lat, lng]);
        // Suppression des marqueurs temporaires et actuelles pour mettre à jour la nouvelle
        if (tempPlayerMarker !== null) tempPlayerMarker.remove(mymap);
        if (playerMarker !== null) playerMarker.remove(mymap);

        // Définition de la position actuelle du joueur
        if (this.position !== null) {
          playerMarker = L.marker([lat, lng], { icon: greenIcon })
            .addTo(mymap)
            .bindPopup("<strong>Votre position</strong>")
            .openPopup();
        }

        lat = null;
        lng = null;
      }
    },
    decreaseTtl: function () {
      if (this.ttl > 0) {
        this.decreaseTtlAction();
      }
    },
    getZrrAndMeteorites: function () {
      this.getAllZrrAndImpacts();
    },
    setDisplayZrrMeteorites: function (L) {
      // On récupère les states sur les zrr et météorites
      // On fait l'affichage sur la carte
      // ZRR
      console.log(this.zrr);
      for (const id in this.zrr) {
        //console.log(this.zrr[id]);
        L.rectangle(
          [
            [this.zrr[id].corner1[0], this.zrr[id].corner1[1]],
            [this.zrr[id].corner2[0], this.zrr[id].corner2[1]],
          ],
          { color: "#FF0000", weight: 1 }
        ).addTo(mymap);
      }

      // Impacts
      /*
      for (const id of Object.keys(this.impacts)) {
        L.marker([this.impacts[id].position[0], this.impacts[id].position[1]], {
          icon: orangeIcon,
        })
          .addTo(mymap)
          .bindPopup(
            `Météorite de type <strong>${this.impacts[id].composition}</strong>.<br>TTL restant: <strong>${this.impacts[id].ttl}</strong>s.`
          );
      }
      */
    },
  },
  async beforeMount() {
    const L = await import("leaflet");

    // Marqueurs: météorites (orange), joueur (vert)
    /*
    var orangeIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });
    */

    var greenIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    // On requête vers le serveur pour récupérer les ZRR mais aussi les coordonnées des météorites
    // Cela permettra de savoir si le token stocké dans l'API Web Storage reste valide
    // S'il n'est pas valide, nous n'aurons aucune informations concernant ces coordonnées
    this.getZrrAndMeteorites();
    this.setDisplayZrrMeteorites(L);

    // ProcÃ©dure d'initialisation: si les coordonnées du joueur n'existent pas: on centre vers nautibus, sinon on centre vers le joueur
    if (this.position === null) {
      console.log("position null");
      mymap = L.map("map", {
        center: [45.78207, 4.86559],
        zoom: zoom,
      });
    } else {
      console.log("position not null");
      mymap = L.map("map", {
        center: this.position,
        zoom: zoom,
      });
      playerMarker = L.marker(this.position, { icon: greenIcon })
        .addTo(mymap)
        .bindPopup("<strong>Votre position</strong>")
        .openPopup();
    }

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

    // Ajout d'un marker: Nautibus
    L.marker([45.78207, 4.86559])
      .addTo(mymap)
      .bindPopup("EntrÃ©e du bÃ¢timent<br><strong>Nautibus</strong>.")
      .openPopup();

    // Clic sur la carte: event
    mymap.on("click", (e) => {
      if (this.ttl > 0) {
        lat = e.latlng.lat;
        lng = e.latlng.lng;
        this.updateMap(L, greenIcon);
      }
    });

    // Fonction qui renvoie les coordonnées au serveur toutes les 5 secondes
    // Si rien n'a été mit (lat et lng a null), alors il ne se passera rien (on attendra les prochaines 5 secondes...)
    window.setInterval(this.updatePlayerPosition, 5000, L, greenIcon);

    //ttl qui diminue de 1 secondes à chaque fois
    window.setInterval(this.decreaseTtl, 1000);
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
