<template>
  <div class="goodInfo myDetail">
    <div class="giftDate" v-if="(t[0].day>0||t[0].day==0)&&info.module_id!=3">
      <img src="@/assets/img/xianshiqianggou.png" alt />
      <div class="span">
        <span class="t" v-text="'距结束仅剩'"></span>
        <span class="span" v-text="t[0].day"></span> :
        <span class="span" v-text="t[0].hour"></span> :
        <span class="span" v-text="t[0].min"></span> :
        <span class="span" v-text="t[0].sec"></span>
      </div>
    </div>
    <div class="infoL" v-if="info">
      <div class="price">
        <div class="currency">
          <!-- 折上折 -->
          <template v-if="info.module_id==2">
            <!-- currenCopper -->
            <div class="currencyG">
              <img v-if="info.points.coin_type==1" src="@/assets/img/currenKing1.png" alt="货币" />
              <img v-if="info.points.coin_type==2" src="@/assets/img/currenCopper.png" alt="货币" />
              <img v-if="info.points.coin_type==3" src="@/assets/img/currenSilver.png" alt="货币" />
              <span v-text="info.points.coins"></span>
              <i class="icon iconfont">+</i>
              <b>￥{{info.sale_price}}</b>
            </div>
          </template>
          <!-- 聚宝 -->
          <template v-if="info.module_id==1">
            <div class="currencyG">
              <img src="@/assets/img/currenKing.png" alt="货币" />
              <span v-text="info.points.coins"></span>
            </div>
          </template>
          <div class="ratio" v-if="info.module_id==3">
            <h3 v-text="'￥'+info.sale_price"></h3>
          </div>
          <div>
            <small v-if="info.module_id!=3">已售{{info.sales_num}}</small>
            <small v-if="info.module_id!=3" v-text="'现货'+info.stock"></small>
          </div>
        </div>
        <div class="biprice" @click="flagFun('comparePrice')" v-if="info.module_id!=3">全网比价</div>
      </div>
      <div class="titleName">
        <div class="title">
          <img v-if="info.module_id===1" src="@/assets/img/icon_jubao.png" alt />
          <img v-if="info.module_id===2" src="@/assets/img/icon_zhe.png" alt />
          <h3 v-text="info.goods_name"></h3>
        </div>
      </div>

      <div class="attr">
        <dl @click="flagFun('specsSku')">
          <dt>规格</dt>
          <dd v-if="skuText!==null&&skuText!=='undefined'&&skuText!==''">已选:"{{skuText}}"</dd>
          <dd v-else>请选择规格属性</dd>
          <dd class="img">
            <img src="@/assets/img/right.png" alt />
          </dd>
        </dl>
        <dl>
          <dt>运费</dt>
          <dd v-text="info.shipping_fee"></dd>
        </dl>
      </div>
      <div class="evaluate" v-if="info.module_id!=3">
        <div class="titl">
          <h3 v-text="'商品评价（'+info.evaluates_num+'）'"></h3>
          <a class="Readeval" @click="flagFun('readEval')">
            查看全部
            <img src="@/assets/img/enter.png" alt />
          </a>
        </div>
        <div class="eval" v-if="info.evaluates.content">
          <ul>
            <li>
              <div class="userPic">
                <img v-if="info.evaluates.buyer_avatar" :src="info.evaluates.buyer_avatar" alt="头像" />
                <img v-else src="@/assets/img/user.png" alt="头像" />
                <span v-text="info.evaluates.buyer_name"></span>
                <span class="date">{{info.evaluates.addtime}}</span>
              </div>
              <div v-if="info.evaluates.content==''" class="text">该用户没有填写评价</div>
              <div v-else class="text" v-text="info.evaluates.content"></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'goodInfo',
  props: ['info', 'skuText', 't'],
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
