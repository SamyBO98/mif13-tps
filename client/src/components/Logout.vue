<template>
  <div class="main-title">
    <h1>Page de déconnexion</h1>
  </div>

  <div v-if="token !== null">
    <form @submit.prevent="formLogin()" id="logoutForm">
      <button type="submit">Se déconnecter</button>
    </form>
  </div>
  <div v-else class="alert">
    <h2>Vous n'avez aucun token stocké.</h2>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Logout",
  data() {
    return {
      token: localStorage.getItem("token"),
    }
  },
  computed: {
    
  },
  methods: {
    ...mapActions(["logout"]),
    formLogin() {
      this.logout();
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
