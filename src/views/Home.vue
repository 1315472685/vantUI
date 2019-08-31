<template>
  <div class="home">
    <img alt="Vue logo"
         src="../assets/logo.png">
    <div>
      <!-- <van-cell-group> -->
      <van-field v-model="username"
                 required
                 clearable
                 label="用户名"
                 right-icon="question-o"
                 placeholder="请输入用户名"
                 @click-right-icon="$toast('question')" />
      <!-- </van-cell-group> -->

      <van-circle v-model="
                   currentRate"
                  :rate="rate"
                  layer-color="#ebedf0"
                  text="颜色定制" />
    </div>

    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
// import { Indicator } from 'mint-ui'
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  data () {
    return {
      username: '',
      currentRate: 0,
      rate: 80,
      gradientColor: {
        '0%': '#ffd01e',
        '100%': '#ee0a24'
      }
    }
  },
  created () {
    // Indicator.open('加载中...')
  }
}
</script>
