<template>
  <div class="hello">
    <div>
      <span>发生的发生的发生的发生水电费发生的发生的发生</span>
      <b>冯绍峰的速度</b>
    </div>

    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org"
         target="_blank"
         rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel"
           target="_blank"
           rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa"
           target="_blank"
           rel="noopener">pwa</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint"
           target="_blank"
           rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org"
           target="_blank"
           rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org"
           target="_blank"
           rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org"
           target="_blank"
           rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs"
           target="_blank"
           rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org"
           target="_blank"
           rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org"
           target="_blank"
           rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org"
           target="_blank"
           rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools"
           target="_blank"
           rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org"
           target="_blank"
           rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue"
           target="_blank"
           rel="noopener">awesome-vue</a></li>
    </ul>
    <dl>
      <dd v-for='item in list'>{{item}}</dd>
    </dl>
    <infinite-loading @infinite="infiniteHandler"
                      spinner="bubbles"
                      ref="infiniteLoading">
      <div slot="spinner">Loading...</div>
      <div slot="no-more">No more message</div>
      <div slot="no-results">No results message</div>
    </infinite-loading>
  </div>
</template>

<script>
import InfiniteLoading from 'vue-infinite-loading'
// this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded');nav toggle

export default {
  name: 'HelloWorld',
  components: {
    InfiniteLoading
  },
  props: {
    msg: String
  },
  data () {
    return {
      list: [1, 2, 3, 4, 5],
      page: 0
    }
  },
  methods: {
    infiniteHandler ($state) {
      console.log('565')
      // .then(({ data }) => {
      if (this.page < 4) {
        setTimeout(() => {
          this.page += 1
          this.list = [...this.list, ...this.list]
          // $state.loaded()
          $state.reset()
        }, 3000)
      } else {
        $state.complete()
      }
      // });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello {
  color: $themeColor;
  // margin-bottom: 100px;
}
h3 {
  font-size: 16px; /*no*/
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
