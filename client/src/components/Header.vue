<template>
  <header>
    <a href="#" v-on:click="logoClicked" class="logo">{{ logo }}</a>
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    logo: String,
  },
  methods: {
    logoClicked: function () {
      console.log("Logo clické. Envoi des données...");
      this.$emit("logoClicked");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  overflow: hidden;
  width: 100%;
  background: rgb(0, 133, 93);
  padding: 20px 10px;
  font-size: 30px;
}

header a {
  text-decoration: none;
  color: white;
}

header a.logo {
  font-size: 25px;
  font-weight: bold;
  padding: 0.5em;
}

header a:hover {
  background-color: #007a8a;
}
</style>
