<template>
  <div class="wrapper">
    <div class="container">
      <div class="heading">
        <text class="title">2048</text>
      </div>
      <div class="game-container">
        <GameGrid :static="true" :random="true" :type="rows" />
      </div>
      <div class="slice">
        <div class="slice-item" @click="previous">
          <!-- <ArrowLeft /> -->
          <text class="slice-text">&lt;</text>
        </div>
        <div class="slice-item">
          <text class="slice-text">
            {{ types[index] }} x {{ types[index] }}
          </text>
        </div>
        <div class="slice-item" @click="next">
          <!-- <ArrowRight /> -->
          <text class="slice-text">&gt;</text>
        </div>
      </div>
      <div class="action">
        <div class="button" @click="start">
          <text class="button-text">开始游戏</text>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GameGrid from '@/components/GameGrid'
// import ArrowLeft from '@/components/ArrowLeft'
// import ArrowRight from '@/components/ArrowRight'

export default {
  name: 'Home',
  components: {
    GameGrid
    // ArrowLeft,
    // ArrowRight
  },
  data() {
    return {
      types: [3, 4, 5, 6, 8],
      index: 1
    }
  },
  computed: {
    rows() {
      return this.types[this.index]
    }
  },
  methods: {
    previous() {
      if (this.index > 0) {
        this.index -= 1
      }
    },
    next() {
      if (this.index < this.types.length - 1) {
        this.index += 1
      }
    },
    start() {}
  }
}
</script>

<style scoped>
.wrapper {
  background-color: #faf8ef;
  color: #776e65;
  align-items: center;
  justify-content: center;
}

.container {
  margin: 0 auto 0 auto;
  width: 700px;
}

.title {
  text-align: center;
  font-size: 120px;
  font-weight: bold;
  color: #776e65;
}

.game-container {
  height: 800px;
  align-items: center;
  justify-content: center;
}

.slice {
  flex-direction: row;
}
.slice-item {
  flex: 1;
}
.slice-text {
  font-size: 75px;
  font-weight: bold;
  text-align: center;
}

.action {
  align-items: center;
}
.button {
  margin: 10px auto;
  padding: 20px 0;
  width: 500px;
  align-items: center;
  background-color: #f58461;
  opacity: 1;
}
.button-text {
  font-size: 32px;
  color: #fff;
}
</style>
