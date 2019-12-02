<template>
  <div class="box">
    <ul>
      <li>
        <span :class="{'active':info.phone.replace(/\s*/g,'')!==''}"></span>
        <input
          @keyup="flag(0)"
          @blur.prevent="changeBlurFn()"
          v-model="info.phone"
          placeholder="请输入账号/手机号"
        />
      </li>

      <li>
        <span :class="{'active':info.surePass.replace(/\s*/g,'')!==''}"></span>
        <input
          @keyup="flag"
          @blur.prevent="changeBlurFn()"
          v-model="info.surePass"
          type="password"
          placeholder="登录密码"
        />
      </li>
      <li>
        <span class="btn" :class="{'active':activeFlag}" @click="passFn">登录</span>
      </li>
    </ul>
    <div class="bottom">
      <div class="switch">
        <mt-switch v-model="remember"></mt-switch>
        <b>记住密码</b>
      </div>
      <router-link :to="{name:'forgetPass'}" tag="div" class="forgetpass">找回密码</router-link>
    </div>
  </div>
</template>
<script>
import { changeBlur } from '@/api/methods';
export default {
  name: 'accoutVue',
  props: ['from', 'btnV'],
  data () {
    return {
      info: {
        phone: '',
        surePass: ''
      },
      remember: false, // 记住密码
      localItem: null, // 密码值
      activeFlag: false
    }
  },
  created () {
    let localItem = localStorage.getItem('pass')
    this.localItem = JSON.parse(localItem)
    if (localItem) {
      if (this.localItem.userName) {
        localStorage.removeItem('pass')
      } else {
        this.info.phone = this.localItem.phone
        this.info.surePass = this.localItem.surePass
        this.remember = this.localItem.remember
        this.activeFlag = true
      }
    }
  },
  methods: {
    changeBlurFn () {
      changeBlur()
    },
    flag (i) {
      // 记住密码
      if (i === 0 && this.localItem) {
        if (this.info.phone !== this.localItem.phone) {
          this.info.surePass = '';
          this.remember = false
        } else {
          this.info.surePass = this.localItem.surePass
          this.remember = true
        }
      }
      // ------------------------
      let len = 0
      for (let item in this.info) {
        this.info[item] = this.info[item].replace(/\s*/g, '')
        if (this.info[item] === '') {
          len++
        }
      }
      if (len === 0) {
        this.activeFlag = true
      } else {
        this.activeFlag = false
      }
    },
    // 修改密码
    passFn () {
      if (this.activeFlag) {
        if (this.info.phone === '') {
          this.$errorTip('请输入账号/手机号')
          return false
        } else if (this.info.surePass.length < 6) {
          this.$errorTip('密码错误')
          return false
        }
        this.passLogin()
      } else {
        // this.$errorTip('请填写完整内容！')
      }
    },
    rememberPass () {
      if (this.remember) {
        // password
        let pass = {
          phone: this.info.phone,
          surePass: this.info.surePass,
          remember: true
        }
        localStorage.setItem('pass', JSON.stringify(pass))
      } else {
        if (this.localItem && this.info.phone == this.localItem.phone) {
          localStorage.removeItem('pass')
        }
      }
    },
    passLogin () {
      this.$loadTip('登录中')
      this.rememberPass()
      let data = { username: this.info.phone, password: this.info.surePass }
      this.$post('/login', data, '')
        .then(res => {
          if (res.data.status === 200) {
            // this.keepAliveFn({ keepAlive: false })
            this.$closeLoad()
            sessionStorage.setItem('login', true)
            localStorage.setItem('token', res.data.data.token)
            localStorage.setItem('shopId', res.data.data.shop_id)
            this.$successTip('登录成功')
            setTimeout(() => {
              this.btnFlag = true
              this.$router.replace({ name: 'user' })
            }, 2000)
          } else {
            this.$closeLoad()
            this.$errorTip(res.data.message)
            this.btnFlag = true
          }
        })
        .catch(err => {
          this.$closeLoad()
          this.$errorTip(err)
          this.btnFlag = true
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  .forgetpass {
    text-align: right;
    font-size: 14px;
    color: rgba(142, 142, 147, 1);
  }

  .bottom {
    display: flex;
    align-items: center;
    padding: 0 28px;

    .forgetpass {
      flex: 1;
    }

    .switch {
      display: flex;
      align-items: center;

      b {
        margin-left: 10px;
      }
    }
  }

  ul {
    padding: 0 28px;

    li {
      display: flex;
      align-items: center;
      padding: 16px 0px;
      border-bottom: 1px solid rgba(200, 199, 204, 1);
      .btn {
        text-align: center;
      }
      &:nth-child(3) {
        border-bottom: none;
      }

      b {
        margin-left: 5px;
        font-size: 14px;
        color: rgba(142, 142, 147, 1);
      }

      input {
        flex: 1;
        padding-left: 6px;
        border: none;
        height: 20px;
        font-size: 16px;
        font-weight: 500;
        line-height: 18px;
        color: #333;
      }

      span {
        display: inline-block;
        width: 22px;
        height: 22px;
        background: url("../../../assets/img/icon_shoujihao_nor@2x.png")
          no-repeat;
        background-size: 100%;

        &.active {
          background: url("../../../assets/img/icon_shoujihao_hig@2x.png")
            no-repeat;
          background-size: 100%;
        }
      }

      &:nth-child(2) {
        span {
          background: url("../../../assets/img/icon_mm_nor@2x.png") no-repeat;
          background-size: 100%;

          &.active {
            background: url("../../../assets/img/icon_mm_hig@2x.png") no-repeat;
            background-size: 100%;
          }
        }
      }

      &:last-child {
        border: none;
        padding-top: 40px;

        span {
          width: 100%;
          line-height: 40px;
          display: block;
          height: 40px;
          background: linear-gradient(
            270deg,
            rgba(253, 24, 63, 1) 0%,
            rgba(255, 65, 98, 1) 100%
          );
          opacity: 0.3;
          border-radius: 20px;
          color: rgba(255, 255, 255, 1);
          font-size: 18px;

          &.active {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
