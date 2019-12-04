<template>
  <div id="app" v-if="info" class="detail2" :class="{'Android':Android}">
    <!--banner-->
    <div
      class="content"
      :class="{'active1':info!=null,'none':info.goods.goods_img_arr!==null&&info.goods.goods_img_arr.length===1}"
    >
      <img
        class="mainPic"
        :src="info.goods.img"
        v-if="info.goods.goods_img_arr===null||info.goods.goods_img_arr.length===0"
      />
      <banner-vue
        @flag="flagFun"
        v-else-if="info&&info.goods.goods_img_arr!==null"
        :banner="info.goods.goods_img_arr"
      ></banner-vue>
      <div class="detail" v-if="info">
        <!-- <div class="putOut" v-if="info.module_id!=3&&info.status!=1">
          <img src="../../assets/img/outPut.png" alt="下架" />
        </div>-->

        <!-- 聚宝折上折详情 -->
        <div class="detail active" v-if="info">
          <gift-info @flag="flagFun" :info="info" :skuText="skuText"></gift-info>

          <!-- 详情 -->
          <pic-desc :description="info.goods.description"></pic-desc>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
/**
 * 模块ID 1聚宝 2折上折 3 随手礼 6京东 7天猫 8淘宝 9苏宁 10 拼多多
 */
import { UrlSearch, checkUA } from '@/api/methods.js';
import bannerVue from './components/bannerVue';
import picDesc from './components/picDesc';
import giftInfo from './components/giftInfo';
let callJsFn
let OCModel = {}
export default {
  name: 'giftDetail',
  components: {
    bannerVue,
    picDesc,
    giftInfo
  },
  data () {
    return {
      Android: false,
      // height: "16.1rem",
      title: '商品详情',
      height: '10rem',
      t: [{ loot_end: 1560783900000, type_id: 3 }],
      info: null,
      goodId: '1212', // 1212 673
      linkObj: null,
      skuText: '',
      giftTime: null,
      nowTime: null
    }
  },
  created () {
    this.getList()
    if (checkUA().isAndroid) {
      this.isAndroid = true
    } else if (checkUA().isIOS) {
      this.isIOS = true
    } else {
      this.isWeb = true
    }
    // 获取数据
    this.getData()
  },
  mounted () {
    window.callJsFn = this.callJs
  },
  methods: {
    // 商品详情
    getData () {
      // return new Promise((reslove, reject) => {
      let obj = UrlSearch({
        sku: '',
        goodId: '',
        token: '',
        orderId: '',
        version: ''
      })
      obj.sku = decodeURI(obj.sku)
      this.linkObj = obj
      let token = obj.token
        ? obj.token
        : 'eyJ0eXAiOiJKV1QiLCJhbGciOiJTSEEyNTYifQ.eyJpc3MiOiJTWSIsImlhdCI6MTU2OTU3ODk3MiwiZXhwIjoxNTcwMTgzNzcyLCJpZCI6NDE2LCJuaWNrbmFtZSI6Ilx1OGRkMVx1NWY5N1x1NWZlYiIsImF2YXRhciI6Imh0dHBzOlwvXC96bWp1YmFvLm9zcy1jbi1iZWlqaW5nLmFsaXl1bmNzLmNvbVwvb3RoZXJcL3ptanViYW9cL3VzZXJcLzQxNmZpbGVzXC8yMDE5XC8wOVwvYzRjMTMwNDI2NS5qcGciLCJzZXgiOjEsInBob25lIjoiMTg2NjU3MzYzMTUiLCJwYXNzd29yZCI6IjBiMWRiOGNhYThmMTI2YWZjYzlhNTU1ZDNjMDMyODlhIiwic3RhdHVzIjoxLCJ1c2VybmFtZSI6bnVsbCwidmlwX2xldmVsIjowLCJ2aXBfZGF0ZSI6bnVsbCwicG9ydGFsX2lkIjoxMDAzMCwicG9ydGFsX2lkX2JrIjowLCJsb2dpbl90aW1lcyI6MSwibWVyY2hhbnRfaWQiOjY2Mzg2MTc5OTAsIm1lcmNoYW50X2lkX2JrIjowLCJpc19iaW5kIjoxLCJpc19kaXN0cmlidXRlIjoxLCJjcmVhdGVfdGltZSI6IjIwMTktMDgtMjkgMTk6MjU6MDIiLCJ1cGRhdGVfdGltZSI6IjIwMTktMDgtMjkgMTk6MjU6MDIifQ.cbb684d25e503d0b7beee5f781a47c62454331554129122bfe2568142b5861ea';

      let goodId = obj.goodId ? obj.goodId : this.goodId
      this.$loadingTip('加载中...')
      let header = { AUTHORIZATION: token, 'api-version': obj.version }
      this.$post(
        '/api/casual-goods-detail',
        { casual_id: goodId, order_id: obj.orderId },
        header
      ).then(res => {
        this.$clearTip()
        if (res.data.status === 200) {
          this.info = res.data.data
        }
      })
    },
    // 传值给原生
    flagFun (i) {
      // 属性随手礼
      let obj
      obj = { flag: 'giftSku' }

      console.log(JSON.stringify(obj))
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
    },
    getList () {
      let aaaa = {
        keyword: '',
        module_id: 3,
        page: 1,
        limit: 10,
        sort: 1,
        elite_id: 0,
        position: 1
      }
      this.$get('/api/goods-lists', aaaa, {
        AUTHORIZATION: '',
        'api-version': '1.5.7'
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 图片详情
// img.mainPic {
//   width: 100%;
//   height: 375px;
// }
</style>
