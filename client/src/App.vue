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
