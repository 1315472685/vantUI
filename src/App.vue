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
  padding: 0;
  margin: 0;
  font-weight: normal;
  list-style: none;
  outline: none;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: rgba(255, 0, 0, 0);
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
