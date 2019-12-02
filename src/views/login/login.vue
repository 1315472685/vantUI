<template>
  <div v-if="show" class="login">
    <!-- <div class="box2"></div> -->
    <!-- <a href="zmjubao://open_zmjubao">打开聚宝</a> -->
    <img src="@/assets/img/appicon.png" alt />
    <nav>
      <span :class="{'active':nav===1}" @click="navFn(1)">密码登录</span>
      <span class="span" :class="{'active':nav===0}" @click="navFn(0)">验证码登录</span>
    </nav>
    <component :is="compon"></component>
    <div class="loginList">
      <div class="loginTitle">
        <span></span>
        <b>第三方账号快速登录</b>
        <span></span>
      </div>
      <div class="iconGroup">
        <img src="@/assets/img/icon_weixin.png" alt />
        <img src="@/assets/img/icon_zhifubao.png" alt />
        <img src="@/assets/img/icon_qq.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
import loginVue from './components/loginVue';
import passVue from './components/passVue';
import { mapState } from 'vuex';
export default {
  name: 'login',
  components: {
    loginVue,
    passVue
  },
  data () {
    return {
      nav: 1,
      show: false,
      compon: 'passVue'
    }
  },
  created () {
    localStorage.removeItem('huancun')

    if (this.isWeiXin() && this.httpUrl != 'http://store-yufa.zmjubao.com') {
      // 是微信浏览器
      let loginFlag = sessionStorage.getItem('login')
      let url = `${this.httpUrl}/Login/getCode`
      if (!loginFlag) {
        sessionStorage.setItem('login', true)

        window.location.href = url
      } else {
        this.show = true
      }
    } else {
      // 不是微信浏览器
      this.show = true
    }
    if (localStorage.getItem('forgetPass') === 'true') {
      this.nav = 1
      this.compon = 'passVue';
    }
  },
  computed: {
    ...mapState(['loginFlag', 'httpUrl'])
  },
  methods: {
    isWeiXin () {
      var ua = window.navigator.userAgent.toLowerCase()
      if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true
      } else {
        return false
      }
    },
    navFn (i) {
      switch (i) {
        case 0:
          this.compon = 'loginVue';
          break
        case 1:
          this.compon = 'passVue';
          break
        default:
          break
      }
      this.nav = i
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  text-align: center;
  min-height: -webkit-fill-available;
  background: #fff;

  .box2 {
    width: 100%;
    height: 200px;
    background: #000;
  }

  img {
    width: 60px;
    height: 60px;
    margin: 100px auto 40px;
  }

  nav {
    position: relative;
    height: 32px;
    display: flex;
    margin: 0 30px 20px;
    border-bottom: 2px solid rgba(200, 199, 204, 1);

    span {
      position: absolute;
      bottom: -2px;
      border-bottom-radius: 2px;
      padding-bottom: 10px;
      border-bottom: 2px solid rgba(200, 199, 204, 1);
      text-align: center;
      font-size: 16px;
      line-height: 18px;
      color: rgba(142, 142, 147, 1);
      width: 50%;

      &.active {
        border-bottom-right-radius: 2px;
        border-bottom-left-radius: 2px;
        font-weight: bold;
        border-bottom: 2px solid rgba(253, 24, 63, 1);
        color: #333;
      }

      &.span {
        left: 50%;
      }
    }
  }

  .loginList {
    display: none;

    .loginTitle {
      justify-content: center;
      display: flex;
      align-items: center;
      text-align: center;
      font-size: 14px;
      color: rgba(142, 142, 147, 1);

      b {
        padding: 0 10px;
      }

      span {
        display: block;
        width: 50px;
        height: 1px;
        background: rgba(200, 199, 204, 1);
      }
    }

    .iconGroup {
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        margin: 40px 20px;
        width: 48px;
        height: 48px;
      }
    }
  }
}
</style>
