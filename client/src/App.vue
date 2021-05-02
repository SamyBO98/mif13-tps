<template>
  <div id="nav">
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/login">Connexion</router-link>
    <router-link to="/logout">Déconnexion</router-link>
    <router-link to="/user">Utilisateur</router-link>
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
      token: null,
      login: null,
      image: null,
    };
  },
  methods: {
    ...mapActions(["authenticate"]),
  },
  async beforeMount() {
    this.token = localStorage.getItem("token");
    this.login = localStorage.getItem("login");
    this.image = localStorage.getItem("image");

    if (
      this.token !== undefined &&
      this.login !== undefined &&
      this.token !== null &&
      this.login !== null
    ) {
      // On authenticate
      this.authenticate({
        login: this.login,
        token: this.token,
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

#nav {
  padding: 2em;
  background-color: #42b983;
}

#nav a {
  margin: 0 0.5em;
  padding: 0.5em;
  border-radius: 0.5em;
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

#nav a.router-link-exact-active {
  background-color: #dddddd;
}

.main-title {
  margin: 3em;
}
</style>
