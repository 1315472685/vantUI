<template>
  <div class="list">
    <img src="../../assets/logo.png" />
    <template v-if="list">
      <van-list
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-card
          v-for="(item,index) in list "
          :key="index"
          :num="item.sales_num"
          :price="item.sale_price"
          :title="item.goods_name"
          :thumb="item.img"
        />
      </van-list>
    </template>
  </div>
</template>
<script>
export default {
  name: 'list',
  data () {
    return {
      list: null,
      error: false,
      loading: false,
      finished: false,
      page: 1
    }
  },
  created () {
    this.getList()
  },
  methods: {
    onLoad () {
      // setTimeout(() => {
      this.loading = true
      this.getList()
      // }, 2000)
    },
    getList () {
      let data = {
        keyword: '',
        module_id: 3,
        page: this.page,
        limit: 10,
        sort: 1,
        elite_id: 0,
        position: 1
      }
      this.$get('/goods-lists', data, {
        AUTHORIZATION: '',
        'api-version': '1.5.8'
      })
        .then(res => {
          if (this.page === 1) {
            this.list = res.data.data
          } else {
            this.list = [...this.list, ...res.data.data]
          }

          this.$nextTick(() => {
            if (this.page === 5) {
              this.page = null
            } else {
              this.page++
            }
            this.loading = false
            if (res.data.data.length !== 10) {
              this.finished = true
            }
          })
        })
        .catch(() => {
          this.page = 6
          this.loading = false
          this.error = true
        })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
