<template>
  <div class="main-title">
    <h1>Page utilisateur</h1>
  </div>

  <div v-if="token !== null">
    <h3>Informations</h3>
    <h4>Login: {{ login }}</h4>
    <h4>Image: 
      <span v-if="image === null">Aucune définie pour le moment</span>
      <image v-else v-bind="image" />
    </h4>
    <h4>TTL: {{ ttl }}</h4>
    <h4>Coordonnées: 
      <span v-if="coordonnees === null">Aucune définie pour le moment</span>
      <span v-else>lat: {{ coordonnees[0] }}, lon: {{ coordonnees[1] }}</span>
    </h4>

    <h3>Mise à jour de l'image</h3>
  </div>
  <div v-else>
    <h3>Vous n'êtes pas connecté. Veuillez vous connecter dans la page de login.</h3>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "User",
  computed: mapState({
    token: (state) => state.token,
    login: (state) => state.login,
    image: (state) => state.imageUrl,
    ttl: (state) => state.ttl,
    coordonnees: (state) => state.playerPosition,
  }),
  methods: {
    ...mapActions([
      'updateImage'
    ]),
  },
};
</script>

<style scoped>
input,
input[type="submit"],
select {
  background-color: #2f4f4f !important;
  color: lightgray;
  border: 1px solid;
}
</style>
