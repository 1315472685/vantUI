<template>
  <!-- v-if="total!==null" -->
  <section class="aui-scrollView">
    <div class="aui-mon-list">
      <router-link tag="a" :to="{name:'buyIntegral'}">
        <img src="@/assets/img/iconPoint.png" alt />
        <p>积分购买</p>
        <img class="right" src="@/assets/img/right.png" alt />
      </router-link>
      <a @click="grantIntegral">
        <img src="@/assets/img/iconSend.png" alt />
        <p>发放积分</p>
        <img class="right" src="@/assets/img/right.png" alt />
      </a>
      <router-link tag="a" :to="{name:'buyRecode'}" class="border">
        <img src="@/assets/img/iconBill.png" alt />
        <p>积分账单</p>
        <img class="right" src="@/assets/img/right.png" alt />
      </router-link>
    </div>
    <div class="divHeight"></div>
    <div class="aui-mon-list">
      <a @click="orderList">
        <img src="@/assets/img/iconOrderlist.png" alt />
        <p>我的订单</p>
        <img class="right" src="@/assets/img/right.png" alt />
      </a>
      <router-link tag="a" :to="{name:'giftadvance'}">
        <img src="@/assets/img/iconBuylist.png" alt />
        <p>礼品预购</p>
        <img class="right" src="@/assets/img/right.png" alt />
      </router-link>
      <a @click="enterGiftList">
        <img src="@/assets/img/iconGift.png" alt />
        <p>发放礼品</p>
        <img class="right" src="@/assets/img/right.png" alt />
      </a>
      <!--  v-if="shopInfo.invite===1&&shopInfo.is_demo===0" -->
      <!-- v-if="shopInfo.invite===1" -->
      <router-link
        tag="a"
        :class="{'border':invite===''||invite===null}"
        v-if="shopInfo.invite===1"
        :to="{name:'busiList'}"
      >
        <img src="@/assets/img/iconInvite.png" alt />
        <p>邀约商家</p>
        <span class="span">{{total}}</span>
        <img class="right" src="@/assets/img/right.png" alt />
      </router-link>
    </div>
    <div class="divHeight"></div>
    <div class="aui-mon-list">
      <router-link tag="a" :to="{name:'profitList'}">
        <img src="@/assets/img/iconList.png" alt />
        <p>分润列表</p>
        <img class="right" src="@/assets/img/right.png" alt />
      </router-link>
      <router-link tag="a" :to="{name:'finance'}" class="border" v-if="shopInfo.type!=0">
        <img src="@/assets/img/iconFinance.png" alt />
        <p>财务统计</p>
        <img class="right" src="@/assets/img/right.png" alt />
      </router-link>
    </div>
  </section>
</template>
<script>
export default {
  name: 'listVue',
  props: ['shopInfo', 'invite'],
  data () {
    return {
      total: null
    }
  },
  created () {
    this.getTotal()
  },
  methods: {
    orderList () {
      window.orderNav = -1
      this.$router.push({ name: 'orderList' })
    },
    grantIntegral () {
      window.userInfo = '';
      this.$router.push({ name: 'grantIntegral' })
    },
    enterGiftList () {
      window.giftListNav = 0
      localStorage.setItem('giftListNav', 0)
      this.$router.push({ path: '/giftList' })
    },
    getTotal () {
      this.$get('/merchant/getInviteMerchant').then(res => {
        if (res.data.status === 200) {
          this.total = res.data.data.total
        }
      })
    },
    enter () {
      window.location.href = `${window.location.origin}/inviteBusin`
    }
  }
}
</script>
<style scoped>
</style>
<style lang="scss" scoped>
.shop {
  text-align: right;
  flex: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  /* 显示的行数 */
  -webkit-box-orient: vertical;
  font-size: 12px;
  color: #909090;
}

.aui-scrollView {
  background: #fff;

  .aui-mon-list {
    padding: 0 16px;
  }

  .divHeight {
    height: 8px;
    background: rgba(246, 246, 246, 1);
  }

  a {
    text-decoration: none;
    display: flex;
    align-items: center;
    border-bottom: 1px solid rgba(222, 222, 222, 1);
    padding: 16px 0;

    span {
      color: #666;
      font-size: 13px;
    }

    .right {
      width: 14px;
      height: 14px;
      margin-right: 0;
    }

    &.border {
      border: none;
    }
  }

  p {
    text-align: left;
    font-size: 14px;
    flex: 1;
    color: rgba(51, 51, 51, 1);
  }

  img {
    width: 22px;
    height: 22px;
    margin-right: 8px;
  }
}
</style>
