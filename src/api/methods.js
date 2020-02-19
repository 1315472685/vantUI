// 获取参数
export function UrlSearch (json) {
  let name
  let value
  let str = window.location.href // 获取到整个地址
  // str = `http://store.zmjubao.com/#/improveInfo?merchant_id=16&name=yue&url=link`,
  let num = str.indexOf('?')
  str = str.substr(num + 1) // 取得num+1后所有参数，这里的num+1是下标 str.substr(start [, length ]
  var arr = str.split('&') // 以&分割各个参数放到数组里
  for (let i = 0; i < arr.length; i++) {
    num = arr[i].indexOf('=')
    if (num > 0) {
      name = arr[i].substring(0, num)
      value = arr[i].substr(num + 1)
      for (let item in json) {
        switch (name) {
          case item:
            json[item] = value
            break
        }
      }
    }
  }
  return json
}

// 封装时分秒
function timer (time) {
  var totalSecond = (time * 1000 - Date.parse(new Date())) / 1000
  // var interval = setInterval(function () {
  // 秒数
  var second = totalSecond
  // 天数位
  var day = Math.floor(second / 3600 / 24)
  var dayStr = day.toString()
  if (dayStr.length == 1) dayStr = '0' + dayStr
  // 小时位
  var hr = Math.floor((second - day * 3600 * 24) / 3600)
  var hrStr = hr.toString()
  if (hrStr.length == 1) hrStr = '0' + hrStr
  // 分钟位
  var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60)
  var minStr = min.toString()
  if (minStr.length == 1) minStr = '0' + minStr
  // 秒位
  var sec = second - day * 3600 * 24 - hr * 3600 - min * 60
  var secStr = sec.toString()
  if (secStr.length == 1) secStr = '0' + secStr
  return {
    dayStr: dayStr,
    hrStr: hrStr,
    minStr: minStr,
    secStr: secStr
  }
  totalSecond--
  // }.bind(this), 1000);
}
// list中的每场倒计时

export function everyCountDown (list) {
  let dataTime = timer(parseInt(list.loot_end))
  list.day = dataTime.dayStr
  list.hour = dataTime.hrStr
  list.min = dataTime.minStr
  list.sec = dataTime.secStr
  return list
}

// 检测浏览器
export function checkUA () {
  var isIOS, isAndroid
  var ua = navigator.userAgent.toLowerCase()
  if (/iphone|ipad|ipod/.test(ua)) {
    isIOS = true
    isAndroid = false
  } else if (/android/.test(ua)) {
    isIOS = false
    isAndroid = true
  }
  return {
    isIOS: isIOS,
    isAndroid: isAndroid
  }
}

// 失去焦点滚动到顶部
export function changeBlur () {
  setTimeout(() => {
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0
    window.scrollTo(0, Math.max(scrollHeight - 1, 0))
    // window.scrollTo(0, 0)
  }, 100)
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
