<template>
  <div class="aui-flexView" v-if="info">
    <header-vue :shopInfo="info"></header-vue>
    <list-vue :info="info" :invite="invite"></list-vue>
  </div>
</template>
<script>
// 1.vip1, 2.vip2, 3.vip3, 4.体验商家1, 5体验商家2, 6体验商家3
import { initWecharTokenEtc } from '@/api/methods';
import headerVue from '@/components/header';
import listVue from './components/list';
export default {
  name: 'user',
  components: {
    headerVue,
    listVue
  },
  data () {
    return {
      info: {},
      shopId: null,
      invite: null
    }
  },
  created () {
    this.shopId = localStorage.getItem('shopId')
    this.getData()
    initWecharTokenEtc()
    // }
    this.businFn()
  },
  methods: {
    getData () {
      this.$loadingTip('加载中...')
      this.$get('/index', { shop_id: this.shopId }, '').then(res => {
        this.$clearTip()
        if (res.data.status === 200) {
          this.info = res.data.data
          if (res.data.data.logo) {
            this.info.logo = `${res.data.data.logo}?${Math.random()}`
          }
          localStorage.setItem('userName', this.info.username)
        }
      })
    },
    businFn () {
      this.$get('/merchant/getInvite').then(res => {
        if (res.data.status === 200) {
          this.invite = res.data.data.invite
        }
      })
    }
  }
}
</script>
<style scoped lang="scss">
.aui-flexView {
  background: rgba(246, 246, 246, 1);
  min-height: -webkit-fill-available;

  .a {
    color: gold;

    a {
      color: hotpink;
    }
  }
}
</style>
