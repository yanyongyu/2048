<template>
  <fragment>
    <div class="heading">
      <text class="title">2048</text>
    </div>
    <div class="game-container"></div>
    <div class="slice">
      <div @click="previous">
        <ArrowLeft class="slice-arrow" />
      </div>
      <scroller
        class="slice-slider"
        :show-scrollbar="false"
        scroll-direction="horizontal"
        :index="index"
      >
        <div v-for="type in types" :key="type" :ref="'type' + type">
          <text class="slice-slider-text" :ref="'text' + type">
            {{ type }} x {{ type }}
          </text>
        </div>
      </scroller>
      <div @click="next">
        <ArrowRight class="slice-arrow" />
      </div>
    </div>
    <div class="action">
      <div class="button">
        <text class="button-text">开始游戏</text>
      </div>
    </div>
  </fragment>
</template>

<script>
import ArrowLeft from '@/components/ArrowLeft'
import ArrowRight from '@/components/ArrowRight'

export default {
  name: 'Home',
  components: {
    ArrowLeft,
    ArrowRight
  },
  data() {
    return {
      types: [3, 4, 5, 6, 8],
      index: 1
    }
  },
  computed: {
    left_disabled() {
      return this.index <= 0
    },
    right_disabled() {
      return this.index >= this.types.length - 1
    }
  },
  methods: {
    previous() {
      console.log(this.index)
      if (this.left_disabled) return
      this.index -= 1
    },
    next() {
      console.log(this.index)
      if (this.right_disabled) return
      this.index += 1
    }
  }
}
</script>

<style scoped>
.title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #776e65;
}

.slice {
  flex-direction: row;
  margin-top: 0.5rem;
}
.slice-arrow {
  width: 1rem;
}
.slice-slider {
  flex-grow: 1;
  overflow: hidden;
}
.slice-slider-text {
  font-size: 0.6rem;
  font-weight: 500;
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
  color: #fff;
}
</style>
