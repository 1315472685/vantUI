<template>
  <div
    class="thirdDetail thirdInfo infoL"
    :class="{'isAndroid':isAndroid}"
    v-if="Number(info.module_id)===6||Number(info.module_id)===7||Number(info.module_id)===8||Number(info.module_id)===9||Number(info.module_id)===10"
  >
    <div class="price">
      <div class="currency">
        <div class="ratio">
          <span v-if="info.goods_third!==null&&Number(info.goods_third.coupon)!==0">券后价</span>
          <b>￥</b>
          <h3>
            <template v-if="Number(info.coupon_price)>0">{{info.coupon_price}}</template>
            <template v-else>{{info.sale_price}}</template>
          </h3>
          <!-- <div class="oldPrice" v-if="info.goods_third!==null&&Number(info.goods_third.coupon)!==0">
            <i>{{info.sale_price}}</i>
          </div>-->
          <!-- <div class="rebateBox">
            <span
              v-if="info.goods_third!==null&&Number(info.goods_third.rebate)>0"
              class="rebate"
            >返利{{info.goods_third.rebate}}元</span>
          </div>-->
        </div>
        <div>
          <small>{{info.sales_num}} 人已抢</small>
        </div>
      </div>
    </div>
    <div class="titleName">
      <div class="title">
        <!-- 模块ID 1聚宝 2折上折 3 随手礼 6京东 7天猫 8淘宝 9苏宁 10 拼多多 -->

        <img v-if="info.module_id===6" src="@/assets/img/icon_jingdong.png" alt />
        <img v-if="info.module_id===7" src="@/assets/img/icon_tianmao.png" alt />
        <img v-if="info.module_id===8" src="@/assets/img/icon_taobao.png" alt />
        <img v-if="info.module_id===9" src="@/assets/img/icon_suning.png" alt />
        <img v-if="info.module_id===10" src="@/assets/img/icon_pinduoduo.png" alt />
        <h3 v-text="info.goods_name"></h3>
      </div>
      <div class="coupon" v-if="info.goods_third!==null&& Number(info.goods_third.coupon)!==0">
        <div class="text">
          <div class="left">
            <div class="priceG">
              <span>¥</span>
              <b>{{info.goods_third.coupon}}</b>
              <i>优惠券</i>
            </div>
            <p>使用时间：{{info.goods_third.start_time}}-{{info.goods_third.end_time}}</p>
          </div>
          <div class="right" @click="flagFun('receive')">立即领取</div>
        </div>
        <img src="@/assets/img/bg_youhuiquan.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'thirdInfo',
  props: ['info', 'isAndroid'],
  methods: {
    flagFun (i) {
      this.$emit('flag', i)
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/info.scss";
</style>
