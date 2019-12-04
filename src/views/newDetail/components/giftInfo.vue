<template>
  <div class="giftInfo myDetail">
    <div class="giftDate">
      <img v-if="info.goods.module_id===3" src="@/assets/img/suishouli.png" alt />
      <img v-if="info.goods.module_id===11" src="@/assets/img/zunxiangli.png" alt />
      <div class="span">
        <span class="t" v-text="'有效期至  '+info.expire_time"></span>
      </div>
    </div>
    <div class="infoL" v-if="info">
      <div class="price">
        <div class="currency">
          <div class="ratio">
            <h3 v-text="'￥'+info.goods.sale_price"></h3>
          </div>
          <!-- v-if="info.goods.is_presell===1" -->
          <b v-if="info.goods.is_presell===1" class="advanceSale">预售:{{info.goods.booking_time}}发货</b>
        </div>
      </div>
      <div class="titleName">
        <div class="title">
          <img v-if="info.goods.module_id===3" src="@/assets/img/icon_sui.png" alt />
          <img v-if="info.goods.module_id===11" src="@/assets/img/icon_zun.png" alt />
          <h3 v-text="info.goods.goods_name"></h3>
        </div>
      </div>

      <div v-if="info.goods.attach_fee_arr&&info.goods.attach_fee_arr.length>0" class="feeArr">
        <div v-for="(item ,index) in info.goods.attach_fee_arr" :key="index" class="priceItem">
          <span v-if="(Number(item.value)>0)" v-text="item.name"></span>
          <div v-if="(Number(item.value)>0)">
            <i>￥</i>
            <b>{{item.value}}</b>
          </div>
        </div>
      </div>

      <div class="attr">
        <dl @click="flagFun('giftSku')">
          <dt>规格</dt>
          <dd
            v-if="skuText!==null&&skuText!==undefined&&skuText!=='undefined'&&skuText!==''"
          >已选:"{{skuText}}"</dd>
          <dd v-else>请选择规格属性</dd>
          <dd class="img">
            <img src="@/assets/img/right.png" alt />
          </dd>
        </dl>
        <dl>
          <dt>运费</dt>
          <dd v-text="info.goods.shipping_fee"></dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'giftInfo',
  props: ['info', 'skuText'],
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
