<template>
  <div class="wrapper">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      logo: "https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png",
    };
  },
};
</script>

<style scoped>
.wrapper {
  background: #faf8ef;
  color: #776e65;
  justify-content: center;
  align-items: center;
}
</style>
