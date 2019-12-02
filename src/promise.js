import router from './router'
import { initWecharTokenEtc } from '@/api/methods'
import { MessageBox } from 'mint-ui'
router.beforeEach(async (to, from, next) => {
  // console.log('to', to)
  // console.log('from', from)
  if (from.name === 'inviteBusin' || from.name === 'receiveGift') {
    // 其他页面分享
    initWecharTokenEtc()
    // console.log('from')
  }
  // 只有当路由跳转的时候才会触发
  if (to.name === 'login' && from.name === 'forgetPass') {
    localStorage.setItem('forgetPass', true)
  } else {
    localStorage.removeItem('forgetPass')
  }
  if (from.name === 'offlinePay' && to.name === 'sureOrder') {
    // 上传凭证返回
    MessageBox.confirm('', {
      message: '是否取消上传凭证支付？',
      title: '',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
      .then(action => {
        if (action === 'confirm') {
          // 确认的回调
          window.orderNav = 0
          next({
            path: '/orderList'
          })
        }
      })
      .catch(err => {
        next(false)
        console.log(err)
      })
  } else {
    // end-----忘记密码返回--密码登录------
    to.matched.some(item => {
      document.title = item.meta.title
      window.scrollTo(0, 0)
      next()
    })
  }
})
