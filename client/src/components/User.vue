<template>
  <h1>Utilisateur</h1>

  <h3>Informations</h3>
  <h4>Login: {{ login }}</h4>
  <h4>Image: {{ imageUrl }}</h4>
  <h4>TTL: {{ ttl }}</h4>
  <h4>Coordonnées: {{ coordonnees }}</h4>

  <h3>Mise à jour du login</h3>

  <h3>Mise à jour de l'image</h3>
</template>

<script>
export default {
  name: "User",
  props: {
    login: String,
    imageUrl: String,
    ttl: Number,
    coordonnees: Array,
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
