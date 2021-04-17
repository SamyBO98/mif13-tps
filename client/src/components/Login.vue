<template>
  <div class="main-title">
    <h1>Page de connexion</h1>
  </div>

  <div v-if="token !== undefined" class="alert">
    <h2>
      Un token est stocké. S'il est invalide ou expiré, veuillez vous
      reconnecter ici, sinon vous pouvez profiter de l'application.
    </h2>
  </div>
  <div>
    <form @submit.prevent="formLogin()" id="loginForm">
      <label for="login">Nom du login:</label>
      <input type="text" :key="login" name="login" id="login" />
      <br />
      <label for="password">Mot de passe:</label>
      <input type="password" :key="password" name="password" id="password" />
      <br />
      <button type="submit">Se connecter</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      token: localStorage.getItem("token"),
    }
  },
  computed: mapState({
    token: (state) => state.token,
  }),
  methods: {
    ...mapActions(["login"]),
    formLogin() {
      var form = document.getElementById("loginForm");
      var login = form.querySelector("input[name=login]").value;
      var password = form.querySelector("input[name=password]").value;

      this.login({
        login: login,
        password: password,
      });
    },
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
.alert {
  margin: 2em auto;
  width: 60%;
  border-radius: 2em;
  padding: 2em;
  border: 2px solid #ff6347;
  background-color: #ff7f50;
}
</style>
