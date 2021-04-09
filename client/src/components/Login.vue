<template>
  <form id="loginForm">
    <label for="login">Login :</label>
    <input type="text" name="login" id="login" />
    <br />
    <label for="password">Password :</label>
    <input type="password" name="password" id="password" />
    <br />
    <button v-on:click="login">Send</button>
  </form>

  <p id="result"></p>
</template>

<script>
export default {
  name: "Login",
  methods: {
    login: (e) => {
      console.log("Login cliqué.");
      let form = document.getElementById("loginForm");
      let loginForm = form.querySelector("input[name=login]");
      let passwordForm = form.querySelector("input[name=password]");

      let result = `Login: ${loginForm.value}. Password: ${passwordForm.value}.`;
      document.getElementById("result").innerHTML = result;
      console.log(result);
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
