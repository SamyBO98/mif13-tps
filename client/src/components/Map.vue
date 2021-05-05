<template>
  <div class="main-title">
    <h1>Page d'accueil</h1>
    <h3>Vous avez accès à la carte</h3>
    <h4>Une fois connecté(e), la carte sera centrée sur votre position</h4>
  </div>

  <section>
    <p class="content">
      <span v-if="geolocation" style="color: green"
        >Votre navigateur supporte la géolocalisation</span
      >
      <span v-else style="color: red"
        >Votre navigateur ne supporte pas la géolocalisation. <br /><strong
          >Il est impossible d'utiliser l'application...</strong
        ></span
      >
    </p>
  </section>

  <section>
    <p class="content">
      <strong>Carte</strong><br />
      <span v-if="ttl === null"
        >Vous devez vous connecter pour récupérer votre TTL.</span
      >
      <span v-else>
        Il reste <strong>{{ ttl }}</strong
        >s.
        <br />
        <strong v-if="ttl === 0">Le TTL a atteint 0. Vous avez perdus!</strong>
      </span>
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
    gameStarted: (state) => state.gameStarted,
  }),
  data() {
    return {
      ttlTimeout: null,
      positionTimeout: null,
      watchId: null,
      geolocation: navigator.geolocation,
      meteorites: [],
    };
  },
  unmounted() {
    clearTimeout(this.ttlTimeout);
    navigator.geolocation.clearWatch(this.watchId);
    navigator.vibrate(0);
  },
  methods: {
    ...mapActions([
      "updatePlayerPositions",
      "decreaseTtlAction",
      "playerMeetImpact",
      "stopGame",
    ]),
    updateMap: function (L, greenIcon) {
      // Mise à jour du marqueur temporaire pour indiquer au joueur sa nouvelle coordonnées temporaire (avant l'envoi des coordonnées au serveur)
      if (tempPlayerMarker != null) tempPlayerMarker.remove(mymap);
      tempPlayerMarker = L.marker([lat, lng], { icon: greenIcon })
        .addTo(mymap)
        .bindPopup("Votre coordonnée temporaire")
        .openPopup();

      // La fonction de validation du formulaire renvoie false pour bloquer le rechargement de la page.
      return false;
    },
    async updatePlayerPosition(position) {
      const L = await import("leaflet");

      const greenIcon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      let tempLat = position.coords.latitude;
      let tempLon = position.coords.longitude;
      console.log("PLAYER POSITION: " + tempLat + " - " + tempLon);
      if (this.ttl > 0) {
        this.updatePlayerPositions([tempLat, tempLon]);
        // Suppression des marqueurs temporaires et actuelles pour mettre à jour la nouvelle
        if (tempPlayerMarker !== null) tempPlayerMarker.remove(mymap);
        if (playerMarker !== null) playerMarker.remove(mymap);

        // Définition de la position actuelle du joueur
        if (this.position !== null) {
          playerMarker = L.marker([tempLat, tempLon], { icon: greenIcon })
            .addTo(mymap)
            .bindPopup("<strong>Votre position</strong>")
            .openPopup();

          var point1 = L.latLng(tempLat, tempLon);
          var index = 0;
          // Si l'utilisateur est proche d'une météorite, on affiche quelque chose
          for (let impact of this.impacts) {
            var point2 = L.latLng(impact.position[0], impact.position[1]);
            if (point1.distanceTo(point2) <= 2) {
              playerMarker.bindPopup(
                `<strong>Votre position</strong><br/>Vous avez gagné <strong>${impact.ttl} secondes</strong>`
              );
              this.playerMeetImpact({
                impact: impact,
                index: index,
                meteorites: this.meteorites,
                mymap: mymap,
              });
              break;
            }
            index = index + 1;
          }
        }
      }
    },
    errorUpdatePosition(error) {
      alert(`Erreur de mise à jour des coordonnées du joueur: ${error}`);
    },
    decreaseTtl: function () {
      console.log("oui");
      if (this.ttl !== null && this.ttl > 0) {
        this.decreaseTtlAction();
        if (this.ttl == 0) {
          clearTimeout(this.ttlTimeout);
          this.stopGame();
          navigator.vibrate([500, 100, 500]);
        }
      }
    },
    setDisplayZrrMeteorites: function (L, orangeIcon) {
      // On récupère les states sur les zrr et météorites
      // On fait l'affichage sur la carte
      // ZRR
      console.log(this.zrr);

      for (let data of this.zrr) {
        L.rectangle(
          [
            [data[0][0], data[0][1]],
            [data[1][0], data[1][1]],
          ],
          { color: "#FF0000", weight: 1 }
        ).addTo(mymap);
      }

      // Impacts
      for (let impact of this.impacts) {
        // On met dans un tableau de données les markers pour les supprimer lorsque le joueur est à moins de 2 mètres
        let marker = L.marker([impact.position[0], impact.position[1]], {
          icon: orangeIcon,
        })
          .addTo(mymap)
          .bindPopup(
            `Météorite de type <strong>${impact.composition}</strong>.<br>TTL restant: <strong>${impact.ttl}</strong>s.`
          );

        this.meteorites.push(marker);
      }

      //console.log(this.meteorites);
    },
    getDistance: function (origin, destination) {
      // return distance in meters
      var lon1 = this.toRadian(origin[1]),
        lat1 = this.toRadian(origin[0]),
        lon2 = this.toRadian(destination[1]),
        lat2 = this.toRadian(destination[0]);

      var deltaLat = lat2 - lat1;
      var deltaLon = lon2 - lon1;

      var a =
        Math.pow(Math.sin(deltaLat / 2), 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLon / 2), 2);
      var c = 2 * Math.asin(Math.sqrt(a));
      var EARTH_RADIUS = 6371;
      return c * EARTH_RADIUS * 1000;
    },
    toRadian: function (degree) {
      return (degree * Math.PI) / 180;
    },
  },
  async beforeMount() {
    const L = await import("leaflet");

    // Marqueurs: météorites (orange), joueur (vert)

    const orangeIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

    const greenIcon = new L.Icon({
      iconUrl:
        "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
      shadowUrl:
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    });

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

    // On requête vers le serveur pour récupérer les ZRR mais aussi les coordonnées des météorites
    // Cela permettra de savoir si le token stocké dans l'API Web Storage reste valide
    // S'il n'est pas valide, nous n'aurons aucune informations concernant ces coordonnées
    this.setDisplayZrrMeteorites(L, orangeIcon);

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
      .bindPopup("Entrée du bâtiment<br><strong>Nautibus</strong>.")
      .openPopup();

    // Clic sur la carte: event
    mymap.on("click", (e) => {
      lat = e.latlng.lat;
      lng = e.latlng.lng;

      if (this.ttl > 0 && this.gameStarted === true) {
        this.updateMap(L, greenIcon);
      }

      // Affichage Ã  la nouvelle position
      mymap.setView([lat, lng], zoom);
    });

    //ttl qui diminue de 1 secondes à chaque fois
    if (this.gameStarted && this.geolocation) {
      this.ttlTimeout = setInterval(this.decreaseTtl, 1000);
      // NEWS: geolocalisation updated
      this.watchId = navigator.geolocation.watchPosition(
        this.updatePlayerPosition,
        this.errorUpdatePosition,
        { timeout: 60000 }
      );
    }

    // Fonction qui renvoie les coordonnées au serveur toutes les 5 secondes
    // Si rien n'a été mit (lat et lng a null), alors il ne se passera rien (on attendra les prochaines 5 secondes...)
    /*
    this.positionTimeout = setInterval(
      this.updatePlayerPosition,
      5000,
      L,
      greenIcon
    );
    */
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
