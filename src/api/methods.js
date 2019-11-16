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
