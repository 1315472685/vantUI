<template>
  <div id="app">
    <div class="box"></div>

    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/about1">About1</router-link>
    </div>

    <router-view :key="key" />
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
  computed: {
    key () {
      // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
      return this.$route.fullPath
    }
  },
  methods: {
    ...mapMutations(['boxHeightFn'])
  }

  // created () {
  //   let screenW = window.screen.width;

  //   if (screenW > 414) {
  //     screenW = 414
  //   }
  //   console.log(screenW)
  //   document.getElementsByTagName("html")[0].style.fontSize =
  //     screenW / 16 + "px";
  // }
}
</script>

<style lang="scss">
@import "./assets/font/font.css";
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
#nav {
  text-align: center;
  font-family: Oswald;
  color: $yellowColor;
  a {
    padding: 0 6px;
    color: $yellowColor;
  }
}
.van-swipe__indicator {
  background: #000 !important;
}
.van-swipe__indicator--active {
  background: #000 !important;
}
#app {
  font-family: "microsoft yahei", "Heiti SC", Helvetica, HelveticaNeue,
    Droidsansfallback, "Droid Sans", Dengxian, Segoe;
  // font-family: "Avenir", Helvetica, Arial, sans-serif;
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
