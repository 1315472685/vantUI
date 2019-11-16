<template>
  <div class="login" :style="{ height: boxHeight+'px'}">
    <div class="box">
      <van-icon class="icon" name="fire-o" />
    </div>
    <div class="content">
      <van-tabs class="tabs" v-model="navIndex">
        <van-tab title="密码登录">
          <form-vue @changeVal="valFn" :navIndex="navIndex"></form-vue>
          <van-button class="btn" type="primary" @click="login" size="large">登录</van-button>
          <div class="passGroup">
            <van-checkbox-group v-model="checked">
              <van-checkbox name="true">记住密码</van-checkbox>
            </van-checkbox-group>
            <span>忘记密码</span>
          </div>
        </van-tab>
        <van-tab title="验证码登录">
          <form-vue @changeVal="valFn" :navIndex="navIndex"></form-vue>
          <van-button class="btn" type="primary" @click="login" size="large">登录</van-button>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import formVue from './components/form';
export default {
  name: 'login',
  data () {
    return {
      formGroup: {},
      checked: [],
      navIndex: 0,
      localPass: null // 缓存的账号密码
    }
  },
  components: {
    formVue
  },
  computed: {
    ...mapState(['boxHeight'])
  },
  created () {
    // 获取缓存的账号密码
    this.getLocalPass()
  },
  methods: {
    // 获取缓存的账号密码，默认是否选中记住密码
    getLocalPass () {
      let localPass = localStorage.getItem('pass')
      this.localPass = JSON.parse(localPass)
      if (localPass) {
        this.checked = ['true']
      }
    },
    // 是否记住密码
    rememberPass () {
      if (this.checked.length > 0) {
        // 记住密码
        let pass = {
          phone: this.formGroup.username,
          surePass: this.formGroup.password,
          remember: true
        }
        localStorage.setItem('pass', JSON.stringify(pass))
      } else {
        // 清空密码
        if (
          this.localPass &&
          Number(this.formGroup.username) === Number(this.localPass.phone)
        ) {
          localStorage.removeItem('pass')
        }
      }
    },
    // 登录操作
    login () {
      this.$loadingTip('登录中...')
      switch (Number(this.navIndex)) {
        case 0:
          // 密码登录
          let data = {
            username: this.formGroup.username,
            password: this.formGroup.password
          }
          if (!data.username || !data.password) {
            this.$errorTip('请填写完整内容')
            return false
          }
          this.passLogin(data)
          break;
        case 1:
          // 手机号码登录
          data = {
            type: 1,
            phone: this.formGroup.username,
            code: this.formGroup.code
          }
          for (let i in data) {
            if (!data[i]) {
              this.$errorTip('请填写完整内容')
              return false
            }
          }
          this.telLogin(data)
          break;
      }
    },
    // 密码登录
    passLogin (data) {
      this.$post('/login', data).then(res => {
        if (res.data.status === 200) {
          this.$successTip('登录成功！')
          this.rememberPass()
        }
      })
    },
    // 手机号码登录
    telLogin (data) {
      this.$post(`/login`, data).then(res => {
        if (res.data.status === 200) {
          this.$successTip('登录成功！')
        }
      })
    },
    // 接收子组件修改值--------------------------------
    valFn (i) {
      this.formGroup = i
      if (this.localPass) {
        // 判断缓存的账号和现在的账号是否一致，不一致的话取消记住密码，以及密码
      }
    }
    // --------------------------------
  }
}
</script>
<style lang="scss" scoped>
.login {
  background: #fff;
  .box {
    text-align: center;
    background: $themeColor;
    height: 250px;
    .icon {
      margin-top: 80px;
      color: #fff;
      font-size: 60px;
    }
  }
  .content {
    position: relative;
    overflow: hidden;
    border-radius: 6px;
    margin-top: -40px;
    background: #fff;
    width: 90%;
    margin-left: 5%;
    box-shadow: 0 2px 12px 0 rgba(103, 125, 130, 0.29);
    .tabs {
      padding-top: 10px;
    }
    .btn {
      box-shadow: 1px 2px 12px #48adf7a1;
      background: $themeColor;
      border-color: $themeColor;
      margin-top: 20px;
    }
    .passGroup {
      box-sizing: border-box;
      width: 100%;
      position: absolute;
      bottom: 30px;
      left: 0;
      padding: 0 30px 0 20px;
      display: flex;
      align-items: center;
      span {
        flex: 1;
        text-align: right;
        color: $yellowColor;
      }
    }
  }
}
</style>
<style>
/* 登录页面 */
.login .van-tab span {
  font-size: 16px;
}
.login .van-tabs__line {
  background-color: #48adf7 !important;
}
.login .van-tab__pane,
.login .van-tab__pane-wrapper {
  padding: 0 20px 70px 20px;
}
.login .van-button--large {
  border-radius: 30px;
  height: 40px;
  line-height: 40px;
}
</style>
