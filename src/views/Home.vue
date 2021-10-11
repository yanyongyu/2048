<template>
  <fragment>
    <div class="heading">
      <text class="title">2048</text>
    </div>
    <div class="slice">
      <div>
        <ArrowLeft class="slice-arrow" />
      </div>
      <slider class="slice-slider"></slider>
      <div><ArrowRight class="slice-arrow" /></div>
    </div>
    <div class="action">
      <div class="button">
        <text class="button-text">开始游戏</text>
      </div>
    </div>
  </fragment>
</template>

<script>
import { Fragment } from 'vue-fragment'
import ArrowLeft from '@/components/ArrowLeft'
import ArrowRight from '@/components/ArrowRight'

export default {
  name: 'Home',
  components: {
    Fragment,
    ArrowLeft,
    ArrowRight
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
