<template>
  <div class="main-title">
    <h1>Page utilisateur</h1>
    <h2>{{ testemit }}</h2>
  </div>

  <div v-if="token !== undefined && token !== null">
    <h3>Informations</h3>
    <h4>Login: {{ login }}</h4>
    <h4>Image:
      <span v-if="image === ''">Aucune image définie pour l'utilisateur.</span>
      <span v-else>{{ image }}</span>
    </h4>

    <h3>Mise à jour de l'image</h3>
    <form @submit.prevent="formUpdateImage()" id="updateImageForm">
      <label for="imageURL">URL de l'image:</label>
      <input type="text" :key="image" name="imageURL" id="imageURL" />
      <br />
      <button type="submit">Mettre à jour</button>
    </form>
  </div>

  <div v-else>
    <h3>Aucun token n'est stocké. Veuillez vous connecter dans la page de connexion.</h3>
  </div>
</template>

<script>
import { apiUpdateImage } from "../api-client/game";

export default {
  name: "User",
  data() {
    return {
      token: null,
      login: null,
      image: null,
    }
  },
  methods: {
    formUpdateImage() {
      var form = document.getElementById("updateImageForm");
      var imageUrl = form.querySelector("input[name=imageURL]").value;

      apiUpdateImage(this.login, imageUrl, this.token.slice(7))
        .then((resp) => {
          console.log(resp);
          localStorage.setItem("image", imageUrl);
        }).catch((error) => {
          console.log(error);
        });
    },
  },
  async beforeMount() {
    this.token = localStorage.getItem("token");
    this.login = localStorage.getItem("login");
    this.image = localStorage.getItem("image");
  }
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
