<template>
  <transition name="fade">
    <div id="app" v-if="info" class="detail2" :class="{'Android':Android}">
      <!--banner-->
      <div
        class="content"
        :class="{'active1':info!=null,'none':info.goods_img_arr!==null&&info.goods_img_arr.length===1}"
      >
        <img class="mainPic" v-if="info.goods_img_arr===null" :src="info.img" />
        <banner-vue
          @flag="flagFun"
          v-else-if="info&&info.goods_img_arr!==null"
          :version="linkObj.version"
          :banner="info.goods_img_arr"
        ></banner-vue>
        <div
          class="detail"
          v-if="info"
          :class="{'active':info.module_id==3||(t[0].day>0||t[0].day==0)&&info.module_id!=3&&Number(info.type_id)===2}"
        >
          <!-- <div class="putOut" v-if="info.module_id!=3&&info.status!=1">
          <img src="../../assets/img/outPut.png" alt="下架" />
          </div>-->

          <!-- 聚宝折上折详情 -->

          <good-info
            :t="t"
            :info="info"
            :skuText="skuText"
            :version="linkObj.version"
            :isAndroid="isAndroid"
            v-if="Number(info.module_id)===1||Number(info.module_id)===2"
            @flag="flagFun"
          ></good-info>
          <!-- 第三方app详情-->
          <third-info
            v-if="Number(info.module_id)===6||Number(info.module_id)===7||Number(info.module_id)===8||Number(info.module_id)===9||Number(info.module_id)===10"
            :info="info"
            :isAndroid="isAndroid"
            @flag="flagFun"
          ></third-info>
          <!-- 详情 -->

          <pic-desc :description="info.description"></pic-desc>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
/**
 * 模块ID 1聚宝 2折上折 3 随手礼 6京东 7天猫 8淘宝 9苏宁 10 拼多多
 */
import { everyCountDown, UrlSearch, checkUA } from '@/api/methods.js';
import bannerVue from './components/bannerVue';
import picDesc from './components/picDesc';
import goodInfo from './components/goodInfo';
import thirdInfo from './components/thirdInfo';
let callJsFn
let OCModel = {}
export default {
  name: 'giftDetail',
  components: {
    bannerVue,
    picDesc,
    thirdInfo,
    goodInfo
  },
  data () {
    return {
      Android: false,
      // height: "16.1rem",
      title: '商品详情',
      height: '10rem',
      t: [{ loot_end: 1560783900000, type_id: 3 }],
      info: null,
      // goodId: '6762191619', // 第三方京东
      // goodId: '6760322634', // 第三方淘宝
      // goodId: '6748463149', // 第三方天猫
      goodId: '6754403148', // 聚宝
      // goodId: '6689449218', // 折上折铜币
      // goodId: '6651592665', // 折上折金币
      // goodId: '6758861806', // 折上折银币
      // goodId: '6615582458', // 限时抢购
      linkObj: null,
      skuText: '',
      giftTime: null,
      nowTime: null,
      isAndroid: null
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
        goodId: '',
        token: '',
        sku: '',
        version: ''
      })
      obj.sku = decodeURI(obj.sku)
      this.linkObj = obj
      let goodId = obj.goodId ? obj.goodId : this.goodId
      // this.$loadingTip('加载中...')
      let header = { AUTHORIZATION: obj.token, 'api-version': obj.version }
      this.$post('/api/goods-details/', { goods_id: goodId }, header).then(
        res => {
          this.$clearTip()
          if (res.data.status === 200) {
            this.info = res.data.data
            if (this.info.type_id === 2) {
              setInterval(() => {
                this.t.splice(0, 1, everyCountDown(this.info))
              }, 500)
            }
          }
        }
      )
    },
    // 传值给原生
    flagFun (i) {
      // 属性随手礼
      let obj
      if (i === 'specsSku' && this.info.module_id === 3) {
        obj = { flag: 'giftSku' }
      } else if (i === 'receive') {
        // 领取优惠券
        let data = {
          goods_link: this.info.goods_third.goods_link,
          module_id: JSON.stringify(this.info.module_id)
        }
        obj = { flag: data }
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
    },
    getList () {
      let aaaa = {
        keyword: '',
        module_id: 1,
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}
// 图片详情
// img.mainPic {
//   width: 100%;
//   height: 375px;
// }
</style>
