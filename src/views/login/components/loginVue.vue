<template>
  <div class="box">
    <ul>
      <li>
        <span :class="{'active':info.phone.replace(/\s*/g,'')!==''}"></span>
        <input
          @keyup="flag(2)"
          @blur.prevent="changeBlurFn()"
          type="tel"
          v-model="info.phone"
          placeholder="请输入手机号"
        />
      </li>
      <li>
        <span :class="{'active':info.code.replace(/\s*/g,'')!==''}"></span>
        <input type="tel" @keyup="flag" @blur="flag(1)" v-model="info.code" placeholder="请输入短信验证码" />
        <small :class="{'active':info.phone.replace(/\s*/g,'')!==''}" @click="getCode">{{btnValue}}</small>
      </li>

      <li>
        <span class="btn" :class="{'active':activeFlag}" @click="login">登录</span>
      </li>
    </ul>
  </div>
</template>
<script>
import { countdownFn, lenFn, changeBlur } from '@/api/methods';
export default {
  name: 'accoutVue',
  props: ['from', 'btnV'],
  data () {
    return {
      info: {
        phone: '',
        code: ''
      },
      disabled: true,
      btnValue: '获取验证码',
      btnFlag: true,
      activeFlag: false,
      type: 1
    }
  },
  methods: {
    changeBlurFn () {
      changeBlur()
    },
    sendCode () {
      let data = {
        phone: this.info.phone,
        type: this.type
      }
      this.$post(`/login/sendMsgCode`, data)
        .then(res => {})
        .catch(err => {
          this.$errorTip(err)
        })
    },

    flag (i) {
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
      if (i === 1) {
        changeBlur()
      }
      if (i === 2) {
        lenFn(this.info, 'phone', 11)
      }
    },
    // 获取验证码
    getCode () {
      if (this.info.phone.length !== 11) {
        this.$errorTip('请输入有效手机号码')
      }
      if (this.disabled) {
        let _this = this
        _this.disabled = false
        countdownFn(_this)
        this.sendCode()
      }
    },
    // 修改密码
    login () {
      if (this.activeFlag) {
        if (this.info.phone.length !== 11) {
          this.$errorTip('请输入有效手机号码')
          return false
        } else if (this.info.code === '') {
          this.$errorTip('请输入验证码')
          return false
        }
        this.$loadTip('登录中')
        let data = {
          type: this.type,
          phone: this.info.phone,
          code: this.info.code
        }
        this.$post(`/login`, data)
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
          })
      } else {
        // this.$errorTip('请填写完整内容！')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.box {
  ul {
    padding: 0 28px;

    li {
      display: flex;
      align-items: center;
      padding: 16px 0px;
      border-bottom: 2px solid rgba(200, 199, 204, 1);
      .btn {
        text-align: center;
      }
      input {
        width: 55%;
        padding-left: 6px;
        border: none;
        height: 20px;
        font-size: 16px;
        font-weight: 500;
        line-height: 18px;
        color: #333;
      }

      small {
        flex: 1;
        display: inline-block;
        text-align: right;
        font-size: 14px;
        line-height: 18px;
        color: rgba(142, 142, 147, 1);
        opacity: 1;

        &.active {
          color: rgba(253, 24, 63, 1);
        }
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
          background: url("../../../assets/img/icon_yanzhengma_nor@2x.png")
            no-repeat;
          background-size: 100%;

          &.active {
            background: url("../../../assets/img/icon_yanzhengma_hig@2x.png")
              no-repeat;
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
