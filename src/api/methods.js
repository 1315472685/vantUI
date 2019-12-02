import wx from 'weixin-js-sdk'
import { getFn, errorTip } from '@/api/axiosVant'
// 失去焦点滚动到顶部
export function changeBlur () {
  setTimeout(() => {
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
    // window.scrollTo(0, 0)
  }, 100)
}
// 去掉空格控制位数
export function lenFn (_this, item, num) {
  if (_this[item] !== '') {
    _this[item] = _this[item].replace(/(^\s*)|(\s*$)/g, '')
    if (_this[item].length > num) {
      _this[item] = _this[item].substring(0, num)
    }
  }
}
// 给页面高度为屏幕高度
export function boxHeight (refName) {
  let height = document.body.clientHeight
  if (refName) {
    refName.style.height = height
  } else {
    return height
  }
}
// 发送验证码倒计时
export function countdownFn (_this) {
  _this.disabled = false
  _this.btnValue = '60s后从新发送'
  let count = 59
  let countdown = setInterval(CountDown, 1000)
  function CountDown () {
    if (count === 0) {
      _this.btnValue = '重新发送验证码'
      _this.disabled = true
      clearInterval(countdown)
    } else {
      _this.disabled = false
      _this.btnValue = `${count}s后从新发送`
      count--
    }
  }
}
// 配置分享
let errorFlag = false
export function initShare (
  configInfo,
  shareTitle1,
  shareTitle2,
  desc,
  pic,
  shareLink,
  flagTip
) {
  wx.config({
    // debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: configInfo.data.appId, // 必填，公众号的唯一标识
    timestamp: configInfo.data.timestamp, // 必填，生成签名的时间戳
    nonceStr: configInfo.data.nonceStr, // 必填，生成签名的随机串
    signature: configInfo.data.signature, // 必填，签名
    jsApiList: ['updateTimelineShareData', 'updateAppMessageShareData'] // 必填，需要使用的JS接口列表
  })
  wx.error(function (res) {
    errorFlag = true
    if (!flagTip) {
      errorTip(res)
    }
  })
  wx.ready(function () {
    // wx.onMenuShareAppMessage({
    wx.updateAppMessageShareData({
      title: shareTitle1,
      desc: desc,
      link: shareLink,
      imgUrl: pic,
      success: function () {
      },
      cancel: function () { }
    })
    // wx.onMenuShareTimeline({
    wx.updateTimelineShareData({
      title: shareTitle2,
      link: shareLink,
      imgUrl: pic,
      success: function () {
      },
      cancel: function () { }
    })
    wx.checkJsApi({
      jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
      success: function (res) {
        let result = JSON.parse(res.checkResult)
        // if (result.updateAppMessageShareData === true) {
        if (!errorFlag && !flagTip) {
          if (result.updateAppMessageShareData === undefined || result.updateAppMessageShareData === false || result.updateTimelineShareData === undefined || result.updateTimelineShareData === false) {
            setTimeout(() => {
              errorTip('改微信版本不支持分享给朋友或分享朋友圈功能')
            }, 500)
          }
        }
      }
    })
  })
}
// 分享
export function initWecharTokenEtc () {
  // 初始化微信接口信息
  getFn('/merchantshare/jsSdkConfig')
    .then(res => {
      if (res.status === 200) {
        initShare(
          res,
          '聚宝商家',
          '聚宝商家',
          '',
          '',
          '',
          true
        )
      }
    })
}
