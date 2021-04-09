<template>
  <!-- HEADER -->
  <Header v-on:logoClicked="handleLogoClicked" logo="gp17 mif13 \ Client" />

  <img alt="Vue logo" src="./assets/logo.png" />

  <!-- MENU
    -> Formulaire de connexion
    -> Affichage de la carte
    -> Mise à jour du login (ou image), coordonnées du joueur dans la carte
  -->
  <Login />

  <User :login="username" />

  <Map />

  <!-- <HelloWorld msg="Welcome to Your Vue.js App" /> -->

  <!-- FOOTER -->
  <Footer />
</template>

<script>
//import HelloWorld from "./components/HelloWorld.vue";
import Footer from "./components/Footer.vue";
import Header from "./components/Header.vue";
import Login from "./components/Login.vue";
import Map from "./components/Map.vue";
import User from "./components/User.vue";

export default {
  name: "App",
  components: {
    Header,
    Login,
    User,
    Map,
    Footer,
  },
  data: function () {
    return {
      username: "otman",
    };
  },
  methods: {
    handleLogoClicked: function () {
      console.log("Logo clické reçu de la part du component fils.");
      this.username = "otman-le-rigolo";
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
