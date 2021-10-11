<template>
  <div class="wrapper">
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {}
  }
}
</script>

<style scoped>
.wrapper {
  background: #faf8ef;
  color: #776e65;
  width: 100%;
  height: 100%;
}

.container {
  width: 500px;
  margin: 30px auto 0 auto;
}

@media screen and (max-width: 520px) {
  .container {
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }
  .container:first-child {
    margin-top: auto;
  }
}
</style>
