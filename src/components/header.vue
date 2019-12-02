<template>
  <div class="headerBg" v-if="shopInfo">
    <!-- <section class="aui-scrollView"> -->
    <img @click="goSet" class="setting" src="../assets/img/icon_setup.png" alt />
    <div class="user">
      <img v-if="shopInfo.logo" :src="shopInfo.logo" alt />
      <img v-else src="../assets/img/userPhoto.jpg" alt />
      <img v-if="shopInfo.vip_type===1" class="level" src="../assets/img/icon_v1.png" alt />
      <img v-if="shopInfo.vip_type===2" class="level" src="../assets/img/icon_v2.png" alt />
      <img v-if="shopInfo.vip_type===3" class="level" src="../assets/img/icon_v3.png" alt />
      <img v-if="shopInfo.vip_type===4" class="level" src="../assets/img/icon_tiyan.png" alt />
      <img v-if="shopInfo.vip_type===5" class="level" src="../assets/img/icon_tiyan.png" alt />
      <img v-if="shopInfo.vip_type===6" class="level" src="../assets/img/icon_tiyan.png" alt />

      <div class="info">
        <h2 v-text="shopInfo.username"></h2>
        <span class="point" v-if="parseFloat(shopInfo.points)>0">积分数 ：{{shopInfo.points}}</span>
        <span class="point" v-else>积分数 ：0</span>
      </div>
    </div>
    <div class="couponInfo">
      <p>邮费券</p>
      <dl>
        <dd @click="enterList">
          <b v-if="totalFreight.total_price!==undefined">{{parseInt(totalFreight.total_price)}}</b>
          <b v-else>0</b>
          <p>总额(元)</p>
        </dd>
        <dt @click="enterList">
          <b v-if="totalFreight.total_price!==undefined">{{totalFreight.number}}</b>
          <b v-else>0</b>
          <p>数量(张)</p>
        </dt>
        <dd>
          <img class="bg" src="../assets/img/btnBg.png" alt />
          <i @click="buyPoint">购买></i>
        </dd>
      </dl>
    </div>
  </div>
</template>
<script>
export default {
  name: 'headerVue',
  props: ['back', 'shopInfo'],
  data () {
    return {
      totalFreight: {}
    }
  },
  created () {
    this.getFreight()
  },
  methods: {
    backFn () {
      this.$router.go(-1)
    },
    // 优惠券列表
    enterList () {
      this.$router.push({ name: 'couponList' })
    },
    // 退出
    goSet () {
      this.$router.push({ path: '/setting' })
    },
    buyPoint () {
      this.$router.push({ name: 'buyCoupon' })
    },
    // 邮费统计
    getFreight () {
      this.$get('/freight/usable').then(res => {
        if (res.data.status === 200) {
          this.totalFreight = res.data.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
// @import "../assets/css/style.css";

.aui-mon-list {
  padding: 20px 0;
}

.headerBg {
  position: relative;
  height: 226px;
  background: #fff url("/static/img/head.eb96343.png") 0 -44px no-repeat;
  background-size: 100%;
}

.icon {
  position: relative;
}

.setting {
  position: absolute;
  right: 16px;
  z-index: 10;
  color: #fff;
  width: 22px;
  height: 22px;
  top: 29px;
}

.user {
  position: relative;
  padding: 26px 0 0 17px;
  display: flex;
  align-items: center;

  .level {
    border: none;
    position: absolute;
    width: 18px;
    height: 18px;
    bottom: 2px;
    left: 60px;
  }

  img {
    border: 1px solid #fff;
    width: 60px;
    margin-right: 10px;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    border-radius: 50%;
    opacity: 1;
  }

  .info {
    text-align: left;
    flex: 1;

    h2 {
      font-size: 20px;
      font-weight: bold;
      color: rgba(255, 255, 255, 1);
    }

    .point {
      margin-top: 8px;
      padding: 0 5px;
      display: inline-block;
      font-size: 12px;
      color: #fff;
      height: 19px;
      background: rgba(255, 255, 255, 0.3);
      border: 1px solid rgba(255, 255, 255, 0.39);
      border-radius: 9px;
    }
  }
}

.couponInfo {
  margin-top: 28px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  opacity: 1;
  border-radius: 8px;
  height: 105px;
  width: 90%;
  margin-left: 5%;

  p {
    padding: 10px 0 0 16px;
    font-size: 14px;
    text-align: left;
    color: rgba(51, 51, 51, 1);
  }

  dl {
    margin-top: 10px;
    text-align: center;
    display: flex;
    align-items: center;

    dd {
      position: relative;
      text-align: center;
      flex: 1;
    }

    dt {
      flex: 1;
      border-left: 1px solid rgba(222, 222, 222, 1);
      border-right: 1px solid rgba(222, 222, 222, 1);
    }

    b {
      font-family: FZCYJ;
      font-size: 21px;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }

    p {
      font-size: 12px;
      padding: 0;
      padding-top: 3px;
      text-align: center;
      color: rgba(98, 100, 104, 1);
    }

    i {
      position: absolute;
      line-height: 24px;
      font-style: normal;
      text-align: center;
      display: inline-block;
      width: 56px;
      height: 23px;
      background: linear-gradient(
        131deg,
        rgba(242, 150, 0, 1) 0%,
        rgba(252, 118, 0, 1) 100%
      );
      opacity: 1;
      border-radius: 12px;
      font-size: 12px;
      color: rgba(255, 255, 255, 1);
      left: 27px;
      top: 8px;
    }

    .bg {
      display: inline-block;
      height: 43px;
      width: 75px;
    }
  }
}
</style>
