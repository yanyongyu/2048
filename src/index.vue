<template>
  <div class="wrapper">
    <div class="container">
      <div class="heading">
        <text class="title">2048</text>
      </div>
      <div class="game-container"></div>
      <div class="slice">
        <div class="flex-1">
          <ArrowLeft />
        </div>
        <div class="flex-1"></div>
        <div class="flex-1">
          <ArrowRight />
        </div>
      </div>
      <div class="action">
        <div class="button">
          <text class="button-text">开始游戏</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowLeft from './components/ArrowLeft'
import ArrowRight from './components/ArrowRight'

export default {
  name: 'Home',
  components: {
    ArrowLeft,
    ArrowRight
  },
  data() {
    return {}
  }
}
</script>

<style scoped>
.wrapper {
  background: #faf8ef;
  color: #776e65;
  align-items: center;
  justify-content: center;
}

.container {
  margin: 0 auto 0 auto;
}

.title {
  text-align: center;
  font-size: 120px;
  font-weight: bold;
  color: #776e65;
}

.slice {
  flex-direction: row;
}
.flex-1 {
  flex: 1;
}

.button {
  margin-top: 0.5rem;
  padding: 20px 0;
  align-items: center;
  justify-content: center;
  background-color: #f58461;
  opacity: 1;
}
.button-text {
  font-size: 32px;
  color: #fff;
}

@media screen {
  .title {
    font-size: 1rem;
  }
}

@media screen and (min-width: 520px) {
  .container {
    width: 500px;
  }
}
</style>
