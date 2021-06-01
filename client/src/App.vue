<template>
  <div class="nav" id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/login">Connexion</router-link>
    <router-link to="/logout">Déconnexion</router-link>
    <router-link to="/user">Utilisateur</router-link>
    <a class="icon" v-on:click="myFunction()">
      <i class="fa fa-bars"></i>
    </a>
  </div>
  <router-view />
</template>

<script>
import { mapActions } from "vuex";
/**
 * A chaque fois qu'on recharge la page, nous allong tenter un authenticate (pour vérifier si le token est bon)
 * Si c'est bon, on récupère l'utilisateur stocké et on le redirige vers la page utilisateur
 * Sinon on le redirige vers la page de connexion (en supprimant les données du token car ils sont invalides)
 */
export default {
  name: "App",
  data() {
    return {
      token: localStorage.getItem("token"),
      login: localStorage.getItem("login"),
    };
  },
  methods: {
    ...mapActions(["authenticate", "redirectUser"]),
    myFunction() {
      var x = document.getElementById("nav");
      if (x.className === "nav") {
        x.className += " responsive";
      } else {
        x.className = "nav";
      }
    },
  },
  async beforeMount() {
    // On vérifie si un token est stocké: si oui on l'authentifie, sinon on le dirige vers la page de connexion
    if (this.token !== null && this.login !== null) {
      console.log("Un token est stocké");
      // On authenticate
      this.authenticate({
        login: this.login,
        token: this.token,
      });
    } else {
      console.log("Aucun stocké détecté");
      this.redirectUser();
    }

    // ask for notifications
    Notification.requestPermission();

    // service workers
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("./sw.js")
        .then(function (reg) {
          // registration worked
          console.log("Registration succeeded. Scope is " + reg.scope);
        })
        .catch(function (error) {
          // registration failed
          console.log("Registration failed with " + error);
        });
    }
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  overflow: hidden;
  background-color: #333;
  margin-bottom: 3em;
}

.nav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.nav a:hover {
  background-color: #42b983;
  color: black;
}

.nav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .nav a:not(:first-child) {
    display: none;
  }
  .nav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .nav.responsive {
    position: relative;
  }
  .nav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .nav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
