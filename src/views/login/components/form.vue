<template>
  <div class="loginForm">
    <van-cell-group>
      <van-field
        v-if="Number(navIndex)===0"
        @input="changeVal"
        class="input"
        v-model.trim="info.username"
        clearable
        left-icon="manager"
        placeholder="请输入用户名/手机号码"
      />
      <van-field
        maxlength="11"
        v-if="Number(navIndex)===1"
        @input="changeVal"
        class="input"
        type="number"
        v-model.number="info.username"
        clearable
        left-icon="manager"
        placeholder="请输入手机号码"
      />
      <van-field
        @input="changeVal"
        class="input"
        v-if="Number(navIndex)===1||Number(navIndex)===2"
        v-model.trim="info.code"
        type="number"
        clearable
        left-icon="diamond"
        placeholder="请输入短信验证码"
      >
        <van-button
          :class="{'active':disabled}"
          class="sendBtn"
          @click="sendCode"
          slot="button"
          size="small"
          type="primary"
        >{{btnValue}}</van-button>
      </van-field>
      <van-field
        @input="changeVal"
        class="input"
        v-if="Number(navIndex)===0||Number(navIndex)===2"
        v-model.trim="info.password"
        clearable
        type="password"
        left-icon="lock"
        placeholder="请输入密码"
      />
      <van-field
        @input="changeVal"
        class="input"
        v-if="Number(navIndex)===2"
        v-model.trim="info.againPass"
        clearable
        type="password"
        left-icon="lock"
        placeholder="请再次输入密码"
      />
      <!--  -->
    </van-cell-group>
  </div>
</template>
<script>
import { countdownFn } from '@/api/methods';
export default {
  name: 'formVue',
  props: ['navIndex'],
  data () {
    return {
      info: {
        code: '',
        username: '',
        password: '',
        againPass: '',
        userText: '请输入用户名/手机号码'
      },
      btnValue: '发送验证码',
      disabled: true
    }
  },
  created () {
    this.getLocalPass()
  },
  methods: {
    // 传值给login组件
    changeVal () {
      this.$emit('changeVal', this.info)
    },
    // 获取验证码以及倒计时
    sendCode () {
      if (String(this.info.username).length !== 11) {
        this.$errorTip('请输入有效手机号码')
        return;
      }
      if (this.disabled) {
        // 倒计时
        countdownFn(this)
        let data = {
          phone: this.info.username,
          type: 1
        }
        this.codeAxios(data)
      }
    },
    // 发送验证码
    codeAxios (data) {
      console.log(data)
      this.$post(`/login/sendMsgCode`, data, { toastMsg: 1 }).then(res => {})
    },
    // 获取缓存的账号密码
    getLocalPass () {
      let localItem = localStorage.getItem('pass')
      localItem = JSON.parse(localItem)
      if (localItem) {
        this.info.username = localItem.phone
        this.info.password = localItem.surePass
      }
    }
  }
}
</script>
<style lang="scss">
.loginForm {
  .input {
    padding: 15px 10px;
  }
  .sendBtn {
    background: transparent;
    color: $fontGray;
    border: none;
    &.active {
      color: $yellowColor;
    }
  }
  .van-field__left-icon .van-icon,
  .van-field__right-icon .van-icon {
    color: $grayColor !important;
  }
}
</style>
<style>
.van-button:active::before {
  opacity: 0 !important;
}
.loginForm {
  margin-top: 15px;
}
.van-tabs__wrap.van-hairline--top-bottom::after,
.van-tabs__wrap.van-hairline--top-bottom::after,
[class*="van-hairline"]::after {
  border: 0 solid transparent !important;
}
</style>
