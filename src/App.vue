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
export default {
  name: 'App',
  computed: {
    key () {
      // 只要保证 key 唯一性就可以了，保证不同页面的 key 不相同
      return this.$route.fullPath
    }
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
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  .box {
    width: 375px;
    height: 250px;
    background: $themeColor;
  }
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
