<template>
  <div id="app" v-if="info" class="detail2" :class="{'Android':Android}">
    <!--banner-->
    <div
      class="content"
      :class="{'active1':info!=null,'none':info.goods_img_arr!==null||info.goods_img_arr.length===1}"
    >
      <banner-vue v-if="info" :banner="info.goods_img_arr" :version="'1.5.3'"></banner-vue>
      <div
        class="detail"
        v-if="info"
        :class="{'active':info.module_id==3||(t[0].day>0||t[0].day==0)&&info.module_id!=3}"
      >
        <!-- <div class="putOut" v-if="info.module_id!=3&&info.status!=1">
          <img src="@/assets/img/outPut.png" alt="下架" />
        </div>-->
        <div class="giftDate" v-if="info.module_id==3">
          <img src="@/assets/img/suishouli.png" alt />
          <div class="span">
            <span class="t" v-text="'有效期至  '+info.casual_present.expire_time"></span>
          </div>
        </div>
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
                  <span :class="'king'+info.points.coin_type" v-text="info.points.coins"></span>
                  <i class="icon iconfont">+</i>
                  <b v-text="'￥'+info.sale_price"></b>
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
                <small v-if="info.module_id!=3">已售{{info.system_sales+info.sales_num}}</small>
                <small v-if="info.module_id!=3" v-text="'现货'+info.stock"></small>
              </div>
            </div>
            <div class="biprice" @click="flagFun('comparePrice')" v-if="info.module_id!=3">全网比价</div>
          </div>
          <div class="title">
            <h3 v-text="info.goods_name"></h3>
          </div>
          <div class="attr">
            <dl
              @click="flagFun('specsSku')"
              v-if="(info.sku.attr_value_items!==undefined&&info.sku.attr_value_items.length>0)||(info.module_id===3)"
            >
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
              <h3 v-text="'商品评价（'+info.evaluates_number+'）'"></h3>
              <a class="Readeval" @click="flagFun('readEval')">
                查看全部
                <img src="@/assets/img/enter.png" alt />
              </a>
            </div>
            <div class="eval" v-if="info.evaluates.content">
              <ul>
                <li>
                  <div class="userPic">
                    <img
                      v-if="info.evaluates.buyer_avatar"
                      :src="info.evaluates.buyer_avatar"
                      alt="头像"
                    />
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
        <div class="pic">
          <div class="a">
            <div class="g">
              <div class="title">
                <span class="line"></span>
                <h3>商品详情</h3>
                <span class="line"></span>
              </div>
            </div>
          </div>
          <div class="desc" v-html="info.description"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { everyCountDown, UrlSearch, checkUA } from '@/api/methods.js';
import bannerVue from './components/bannerVue';

let callJsFn
var OCModel = {}
export default {
  name: 'detail',
  data () {
    return {
      Android: false,
      height: '16.1rem',
      title: '商品详情',
      t: [{ loot_end: 1560783900000, type_id: 2 }],
      info: null,
      // goodId: '6748463170', // 第三方京东
      goodId: '6758861806', // 第三方淘宝
      // goodId: '6748463149', // 第三方天猫
      // goodId: '6706703244', // 聚宝
      // goodId: '6689449218', // 折上折铜币
      // goodId: '6651592665', // 折上折金币
      // goodId: '6640515940', // 折上折银币
      // goodId: '6615582458',
      linkObj: null,
      skuText: '',
      giftTime: null,
      nowTime: null
    }
  },
  components: {
    bannerVue
  },
  created () {
    // 域名
    console.log(window.location)
    if (checkUA().isAndroid) {
      this.isAndroid = true
      console.log('isAndroid')
    } else if (checkUA().isIOS) {
      this.isIOS = true
      console.log('isIOS')
    } else {
      console.log('isWeb')
      this.isWeb = true
    }
    // 获取数据
    this.getData()
    console.log('ios')
  },
  mounted () {
    window.callJsFn = this.callJs
  },
  methods: {
    flagFun (i) {
      // 属性随手礼
      let obj
      if (i === 'specsSku' && this.info.module_id === 3) {
        obj = { flag: 'giftSku' }
      } else {
        obj = { flag: i }
      }
      console.log(obj)
      if (checkUA().isAndroid) {
        console.log('isAndroid')
        obj = JSON.stringify(obj)
        window.OCModel.jsCallNative(obj)
      }
      if (checkUA().isIOS) {
        console.log('isIOS')
        try {
          window.webkit.messageHandlers.handleGoodsDetaiEvent.postMessage(obj)
        } catch (ex) {
          window.OCModel.jsCallNative(obj)
        }
      }
    },
    callJs (str) {
      this.skuText = str
      // console.log(str);
    },
    // 商品详情
    getData () {
      let obj = UrlSearch({
        goodId: '',
        token: '',
        sku: '',
        version: ''
      })
      obj.sku = decodeURI(obj.sku)
      this.linkObj = obj
      let token = obj.token ? obj.token : this.token
      let goodId = obj.goodId ? obj.goodId : this.goodId
      this.$loadingTip('加载中...')
      let header = { AUTHORIZATION: token }
      this.$get('/api/goods-detail/' + goodId, '', header).then(res => {
        this.$clearTip()
        if (res.data.status == 200) {
          this.info = res.data.data
          if (this.info.type_id == 2) {
            setInterval(() => {
              this.t.splice(0, 1, everyCountDown(this.info))
            }, 500)
          }
          this.flagFun(this.info.sku_id)
        }
      })
    }
  }
}
</script>
<style scoped>
#app {
  overflow-x: hidden;
  font-family: "PingFang SC";
}
#app.Android {
  font-family: "Franklin Gothic Medium";
}
.content {
  display: none;
}
.content.active1 {
  display: block;
}
#app.active {
  height: -webkit-fill-available;
  overflow: hidden;
}
.swiper-slide img {
  width: 100%;
}
.detail .giftDate {
  position: relative;
  color: #fff;
  width: 100%;
}
.detail .giftDate img {
  width: 100%;
}
.detail .giftDate span.t {
  color: #fff;
  margin-right: 5px;
  font-size: 20px;
  top: 0.6rem;
  left: 4.2rem;
}
.detail .giftDate div.span {
  position: absolute;
  top: 15px;
  left: 100px;
}
.detail .giftDate span.span {
  background: #333;
  border-radius: 2px;
  font-size: 14px;
  padding: 0 2px;
}
.detail .putOut {
  position: absolute;
  z-index: 10;
  top: 7rem;
  left: 5rem;
}
.detail .putOut img {
  width: 6rem;
  height: auto;
}
.detail .pic {
  text-align: center;
}
.detail .pic .a {
  background: #f7f7f7;
}
.detail .pic .g {
  display: inline-block;
}
.detail .pic .title {
  display: flex;
  align-items: center;
  width: auto;
}
.detail .pic .title h3 {
  color: #8e8e93ff;
  padding: 12px;
  font-size: 12px;
  text-align: center;
}
.detail .pic .title .line {
  width: 40px;
  height: 1px;
  background: #909094;
  display: inline-block;
}
.detail .pic img {
  width: 100%;
  height: auto;
}
.detail .time {
  background: #fd153c;
  color: #fff;
  display: inline-block;
  padding: 0.5rem;
  border-radius: 0 0.8rem 0.8rem 0;
  font-size: 16px;
}
.detail .desc {
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
}
.detail .desc img {
  width: 100% !important;
  height: auto;
}
.swiper-pagination-bullet-active {
  background: #000;
}
.infoL .price {
  display: flex;
  align-items: flex-end;
  padding: 0.5rem;
}
.infoL .price .biprice {
  background: #fd153c;
  color: #fff;
  border-radius: 4px;
  font-size: 14px;
  padding: 3px 10px;
}
.infoL .price .currency {
  flex: 1;
}
.infoL .price .currency small {
  color: #9e9e9f;
  font-size: 12px;
  margin-right: 5px;
}
.infoL .price .currency .currencyG {
  display: flex;
  align-items: center;
}
.infoL .price .currency .currencyG img {
  margin-right: 5px;
  margin-top: -2px;
}
.infoL .price .currency i {
  font-size: 20px;
  color: #868788;
  margin-top: -3px;
}
.infoL .price .currency img {
  height: 22px;
  width: 22px;
}
.infoL .price .currency span {
  font-size: 22px;
  color: #f29600;
  font-weight: bold;
}
.infoL .price .currency .king1 {
  color: #f19f21;
}
.infoL .price .currency .king2 {
  color: #807f7f;
}
.infoL .price .currency .king3 {
  color: #be775d;
}
.infoL .price .currency b {
  color: #fd153c;
  font-size: 22px;
  font-weight: bold;
  display: inline-block;
}
.infoL .price .currency b small {
  font-size: 0.5rem;
  color: #c30d23;
  margin-left: 0;
}
.infoL .price .currency .ratio {
  color: #fd153c;
  font-size: 20px;
}
.infoL .price .currency .ratio h3 {
  font-weight: bold;
}
.infoL .title {
  display: flex;
  align-items: center;
  padding: 0 0 0 0.5rem;
}
.infoL .title h3 {
  font-size: 16px;
  flex: 1;
  padding-right: 2rem;
  font-weight: bold;
  color: #333;
}
.infoL .title div {
  color: #9e9e9f;
  background: #dbdcdc;
  border-radius: 0.2rem 0 0 0.2rem;
  padding: 0.1rem 0.3rem;
}
.infoL .attr {
  border-top: 8px solid #f6f6f6;
  border-bottom: 8px solid #f6f6f6;
  background: #fff;
  padding: 0.5rem 0.5rem 0.1rem;
  margin-top: 0.5rem;
  font-size: 12px;
}
.infoL .attr dl {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  flex-wrap: wrap;
}
.infoL .attr dl dt {
  color: #333;
  border-radius: 0.2rem;
  border: 1px solid #333;
  padding: 0.05rem 0.2rem;
  margin-bottom: 0.2rem;
  font-size: 14px;
}
.infoL .attr dl dd {
  color: #6b6c6eff;
  margin-left: 0.2rem;
  margin-bottom: 0.2rem;
  font-size: 14px;
}
.infoL .attr dl dd.img {
  flex: 1;
  text-align: right;
}
.infoL .attr dl dd.img img {
  float: right;
  width: 14px;
  height: 14px;
}
.infoL .evaluate {
  padding: 0.5rem;
}
.infoL .evaluate .titl {
  display: flex;
  align-items: center;
}
.infoL .evaluate .titl h3 {
  color: #333;
  font-size: 16px;
  flex: 1;
}
.infoL .evaluate .titl a {
  color: #fd153c;
  display: flex;
  align-items: center;
}
.infoL .evaluate .titl a img {
  width: 14px;
  height: 14px;
}
.infoL .Readeval {
  color: #fd153c;
  font-size: 14px;
}
.weui-toast_content {
  font-size: 12px;
}
.eval li {
  padding: 0 0;
}
.eval li .userPic {
  display: flex;
  align-items: center;
  font-size: 0.5rem;
  color: #6b6c6eff;
  margin-top: 0.5rem;
}
.eval li .userPic img {
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  margin-right: 0.2rem;
}
.eval li .userPic span {
  flex: 1;
  font-size: 14px;
}
.eval li .userPic .date {
  flex: none;
  font-size: 12px;
  color: #8d8d92;
}
.eval li .text {
  font-size: 14px;
  margin-top: 0.2rem;
  line-height: 0.9rem;
  word-break: break-all;
}
.eval li .img img {
  width: 4.6rem;
  height: 4.6rem;
  margin: 0.3rem 0.3rem 0 0;
}
</style>
