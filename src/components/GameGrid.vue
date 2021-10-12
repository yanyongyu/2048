<template>
  <div class="game-wrapper">
    <div class="grid-row" v-for="row in type" :key="row">
      <div class="grid-col" v-for="col in type" :key="col"></div>
    </div>
    <div class="game-content"></div>
  </div>
</template>

<script>
export default {
  name: 'GameGrid',
  props: {
    static: {
      type: Boolean,
      default: false
    },
    random: {
      type: Boolean,
      default: false
    },
    randomRange: {
      type: Number,
      default: 5
    },
    type: {
      type: Number,
      default: 4,
      validator(value) {
        return [3, 4, 5, 6, 8].indexOf(value) < 0 ? 'danger' : 'success'
      }
    }
  }
}
</script>

<style scoped>
.game-wrapper {
  position: relative;
  border-width: 5px;
  border-radius: 12px;
  border-color: #776e65;
  background-color: #776e65;
}

.grid-row {
  height: 80x;
  flex-direction: row;
}
.grid-col {
  width: 80px;
  margin: 0;
  padding: 0;
  border-width: 2px;
  border-color: #776e65;
  border-radius: 6px;
  background-color: #eeeeee;
}

.game-content {
  position: absolute;
}
</style>
