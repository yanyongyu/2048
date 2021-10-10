<template>
  <div class="wrapper">
    <text>hello</text>
    <router-view />
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
  justify-content: center;
  align-items: center;
}
</style>
