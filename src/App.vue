<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from "./components/home";

export default {
  name: "App",
  components: {
    Home,
  },
};
</script>
<style>
.main-hero {
  background-image: url("https://pixabay.com/get/g0a60abe83efe26c3e40e64e1afb443b59e2daf6c7c26f1888d7f7d609bdae982e3c1c6c4da7839ed835b549ca446a6f1_1920.jpg");
  background-size: cover;
  backdrop-filter: blur(20px);
}
</style>