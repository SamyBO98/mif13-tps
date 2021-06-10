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
let playerMarker = null;
let mymap = {};

export default {
  name: "Map",
  computed: mapState({
    position: (state) => state.playerPosition,
    zrr: (state) => state.zrr,
    ttl: (state) => state.ttl,
    impacts: (state) => state.impacts,
    otherPlayers: (state) => state.otherPlayers,
    gameStarted: (state) => state.gameStarted,
  }),
  data() {
    return {
      ttlTimeout: null,
      watchId: null,
      geolocation: navigator.geolocation,
      impactsMarkers: [],
      zrrMarkers: [],
      otherPlayersMarkers: [],
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
      "getAllZrr",
      "getAllResources",
      "startGame",
    ]),
    async updateDatasAndMarkers(position) {
      //console.log("updateDatasAndMarkers");
      const L = await import("leaflet");

      // Marqueurs: météorites (orange), joueur (vert), autres joueurs (rouge)
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

      const redIcon = new L.Icon({
        iconUrl:
          "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
        shadowUrl:
          "https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
      });

      // On supprime les markers
      this.deleteMarkers();

      if (this.ttl > 0) {
        // On met à jour les données (store)
        this.updateDatas(position);

        // On met à jour les markers (affichage)
        this.displayMarkers(L, position, greenIcon, orangeIcon, redIcon);

        // On vérifie si le joueur est proche d'une météorite
        this.checkIfPlayerMeetImpact(L, position);
      }
    },
    errorUpdatePosition(error) {
      alert(`Erreur de mise à jour des coordonnées du joueur: ${error}`);
    },
    deleteMarkers() {
      // On supprime tout les markers: zrr, impacts, joueurs
      if (playerMarker !== null) playerMarker.remove(mymap);

      for (let zrrMarker of this.zrrMarkers) {
        zrrMarker.remove(mymap);
      }
      this.zrrMarkers = [];

      for (let impactMarkers of this.impactsMarkers) {
        impactMarkers.remove(mymap);
      }
      this.impactsMarkers = [];

      for (let otherPlayersMarker of this.otherPlayersMarkers) {
        otherPlayersMarker.remove(mymap);
      }
      this.otherPlayersMarkers = [];
    },
    updateDatas(position) {
      // On lance les requêtes dans le fichier actions pour mettre à jour le store: coordonnées des joueurs, impacts non récupérées, zones de zrr
      this.updatePlayerPositions([
        position.coords.latitude,
        position.coords.longitude,
      ]);

      this.getAllZrr();
      //console.log(this.zrr);

      this.getAllResources();
      //console.log(this.impacts);
      //console.log(this.otherPlayers);
    },
    displayMarkers(L, position, greenIcon, orangeIcon, redIcon) {
      // On met à jour les markers: ceux des joueurs, ceux des zrr et ceux des impacts non récupérées
      playerMarker = L.marker(
        [position.coords.latitude, position.coords.longitude],
        { icon: greenIcon }
      )
        .addTo(mymap)
        .bindPopup("<strong>Votre position</strong>")
        .openPopup();

      for (let zrr of this.zrr) {
        let marker = L.rectangle(
          [
            [zrr[0][0], zrr[0][1]],
            [zrr[1][0], zrr[1][1]],
          ],
          { color: "#FF0000", weight: 1 }
        ).addTo(mymap);
        this.zrrMarkers.push(marker);
      }

      for (let impact of this.impacts) {
        let marker = L.marker([impact.position[0], impact.position[1]], {
          icon: orangeIcon,
        })
          .addTo(mymap)
          .bindPopup(
            `Météorite de type <strong>${impact.composition}</strong>.<br>TTl: <strong>${impact.ttl}</strong>s.`
          );

        this.impactsMarkers.push(marker);
      }

      for (let otherPlayer of this.otherPlayers) {
        if (otherPlayer.position !== undefined) {
          let marker = L.marker(
            [otherPlayer.position[0], otherPlayer.position[1]],
            {
              icon: redIcon,
            }
          )
            .addTo(mymap)
            .bindPopup(`Joueur <strong>${otherPlayer.login}</strong>.`);

          this.otherPlayers.push(marker);
        }
        
      }
    },
    checkIfPlayerMeetImpact(L, position) {
      // On vérifie si le joueur est proche d'une météorite: si oui on ajoute son ttl, on envoie une requête au serveur et le supprimons dans nos données
      let meetedIndex = [];
      let playerCoordinate = L.latLng(
        position.coords.latitude,
        position.coords.longitude
      );
      //console.log(this.impacts);
      for (let i = 0; i < this.impacts.length; i++) {
        let impactCoordinate = L.latLng(
          this.impacts[i].position[0],
          this.impacts[i].position[1]
        );
        let distance = playerCoordinate.distanceTo(impactCoordinate);
        //console.log("Distance " + distance);
        if (distance <= 2) {
          meetedIndex.push(i);
        }
      }

      let totalTtlEarned = 0;
      let totalImpactsMeeted = 0;
      // On lance une requête pour chaque impact pour indiquer que celle-ci est récupérée par ce joueur
      for (let i = meetedIndex.length - 1; i >= 0; i--) {
        let ttlEarned = this.playerMeetImpact({
          impact: this.impacts[i],
          index: i,
        });
        totalTtlEarned += ttlEarned;
        if (ttlEarned != 0) {
          totalImpactsMeeted += 1;
          this.impactsMarkers[i].remove(mymap);
          this.impactsMarkers[i].splice(i, 1);
        }
      }

      if (totalImpactsMeeted != 0) {
        mymap.setView([position.coords.latitude, position.coords.longitude]);
        playerMarker
          .bindPopup(
            `<strong>Votre position</strong><br>vous avez gagné <strong>${totalTtlEarned} secondes</strong> en ayant découvert <strong>${totalImpactsMeeted} météorite(s)</strong>.`
          )
          .openPopup();
      }
    },
    decreaseTtl: function () {
      //console.log("oui");
      if (this.ttl !== null && this.ttl > 0) {
        this.decreaseTtlAction();
        if (this.ttl == 0) {
          clearTimeout(this.ttlTimeout);
          this.stopGame();
          navigator.vibrate([500, 100, 500]);
          this.notificateEndGame();
        }
      }
    },
    notificateEndGame() {
      const notifTitle = `MIF13 GP17`;
      const notifBody = `Fin de partie. Le TTL à atteint 0.`;
      const options = {
        body: notifBody,
      };
      new Notification(notifTitle, options);
    },
  },
  async beforeMount() {
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

    // ProcÃ©dure d'initialisation: si les coordonnées du joueur n'existent pas: on centre vers nautibus, sinon on centre vers le joueur
    if (this.position === null) {
      mymap = L.map("map", {
        center: [45.78207, 4.86559],
        zoom: zoom,
      });
    } else {
      mymap = L.map("map", {
        center: this.position,
        zoom: zoom,
      });
      // On définit le marqueur du joueur
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

    // Evenement: clic sur la carte => on centre l'endroit sélectionné
    mymap.on("click", (e) => {
      lat = e.latlng.lat;
      lng = e.latlng.lng;

      // Affichage Ã  la nouvelle position
      mymap.setView([lat, lng]);
    });

    //ttl qui diminue de 1 secondes à chaque fois si la géolocalisation marche et que la partie est lancée
    if (this.gameStarted && this.geolocation) {
      this.startGame();
      this.ttlTimeout = setInterval(this.decreaseTtl, 1000);
      // NEWS: geolocalisation updated
      this.watchId = navigator.geolocation.watchPosition(
        this.updateDatasAndMarkers,
        this.errorUpdatePosition,
        { timeout: 60000 }
      );
    }
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
