<template>
  <footer>
    <h1>Ceci est un footer.</h1>
    <h3>Il n'y a rien d'exceptionnel...</h3>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgb(0, 133, 93);
  color: white;
  text-align: center;
}
</style>
