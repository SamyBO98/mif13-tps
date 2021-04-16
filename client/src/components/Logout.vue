<template>
  <div class="main-title">
    <h1>Page de déconnexion</h1>
  </div>

  <form id="logoutForm">
    <button v-on:click="logout">Se déconnecter</button>
  </form>
</template>

<script>
export default {
  name: "Login",
  methods: {
    logout: (e) => {
      console.log("Formulaire de déconnexion envoyé.");
      e.preventDefault();
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
</style>
