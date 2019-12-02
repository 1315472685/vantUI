<template>
  <div class="pic">
    <div class="a">
      <div class="g">
        <div class="title">
          <span class="line"></span>
          <h3>图片详情</h3>
          <span class="line"></span>
        </div>
      </div>
    </div>
    <div class="desc" v-html="description"></div>
  </div>
</template>
<script>
export default {
  name: 'picDesc',
  props: ['description']
}
</script>
<style lang="scss" scoped>
// 图片详情
.detail {
  .pic {
    text-align: center;
    .a {
      background: #f7f7f7;
      .g {
        display: inline-block;
        .title {
          align-items: center;
          display: flex;
          width: auto;
          h3 {
            color: #8e8e93ff;
            padding: 12px;
            font-size: 12px;
          }
          .line {
            width: 40px;
            height: 1.2px;
            background: #909094;
            display: inline-block;
          }
        }
      }
    }
  }
}
</style>
