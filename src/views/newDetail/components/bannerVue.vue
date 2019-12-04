<template>
  <div class="swiper">
    <van-swipe @change="onChange" :initial-swipe="index">
      <van-swipe-item v-for="(item,index) in banner" :key="index">
        <img @click="PreviewFn(true)" :src="item" class="goodPic" alt="商品图" />
      </van-swipe-item>
    </van-swipe>
    <!-- 放大图 -->
    <van-image-preview
      v-model="show"
      :images="banner"
      :start-position="index"
      @change="onChange"
      @close="PreviewFn(false)"
    >
      <template v-slot:index>{{ bannerIndex+1 }}/{{banner.length}}</template>
    </van-image-preview>
  </div>
</template>
<script>
export default {
  name: 'bannerVue',
  props: ['banner'],
  data () {
    return {
      index: 0,
      show: false,
      bannerIndex: 0,
      flag: false
    }
  },
  methods: {
    onChange (index) {
      this.bannerIndex = index
    },
    PreviewFn (i) {
      if (i) {
        // 打开
        this.flag = true
        this.$emit('flag', 'banner')
      } else if (this.flag) {
        // 关闭
        this.flag = false
        this.$emit('flag', 'close')
      }
      this.show = i
      this.index = this.bannerIndex
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper {
  min-height: 300px;
}
img.goodPic {
  display: block;
  width: 100%;
  height: auto;
}
</style>
