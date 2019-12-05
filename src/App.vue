<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapMutations } from 'vuex';
export default {
  name: 'App',
  created () {
    // console.log(window.screen.height)
    // console.log(window.screen.availHeight)
    this.boxHeightFn(window.screen.availHeight)
  },
  methods: {
    ...mapMutations(['boxHeightFn'])
  }
}
</script>

<style lang="scss">
* {
  font-style: normal;
  padding: 0;
  margin: 0;
  font-weight: normal;
  list-style: none;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
}
.van-swipe__indicator {
  background: #000 !important;
}
.van-swipe__indicator--active {
  background: #000 !important;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.detail .desc img {
  width: 100% !important;
  height: auto !important;
}
.swiper.none .c-swipe-pagination-bar {
  display: none !important;
}
.c-swipe-pagination-item.active {
  background: #000 !important;
}
</style>
