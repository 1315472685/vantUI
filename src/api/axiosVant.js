import request from '@/utils/request'
import { Toast } from 'vant'
import md5 from 'js-md5'
let nowDate = parseInt(new Date().getTime() / 1000)
// 拼接签名
function sortFn1 (url, obj, method, headers) {
  // console.log(headers)
  if (!headers) {
    headers = {}
  }
  if (!headers['api-version']) {
    headers['api-version'] = '1.5.3'
  }
  headers['X-Ca-Timestamp'] = nowDate
  var data = JSON.parse(JSON.stringify(obj))

  let link = `url=/api${url}`

  if (data) { // 有参数
    let objKey = Object.keys(data)
    let arrSort = []
    if (method === 'get') {
      arrSort = objKey
    } else {
      // 排序
      arrSort = objKey.sort(function (s, t) {
        let a = s.toLowerCase()
        let b = t.toLowerCase()
        if (a < b) return -1
        if (a > b) return 1
        return 0
      })
    }
    // console.log(arrSort)
    // 拼接
    let num = 0
    for (let item of arrSort) {
      num++
      if (typeof data[item] === 'object') {
        data[item] = JSON.stringify(data[item])
      }
      if (num === 1 && method === 'get') {
        link += `?${item}=${data[item]}`
      } else {
        link += `&${item}=${data[item]}`
      }
    }
  }
  // 拼接完成
  // console.log(Number(headers['api-version'].split('.').join('')))
  if (Number(headers['api-version'].split('.').join('')) >= 158) {
    if (!data && method === 'get') {
      link += `?timestamp=${nowDate}`
    } else {
      link += `&timestamp=${nowDate}`
    }
  }

  link += '&sign_secret=NevJKwg1DzKmU4jxvjQ7tAqigjc2IRvPMgHS9pwRGeEgoP11uz2sPsHr3BkOzo4rLwvXsjphKNWGfvrLSpdWcHgoJoOrr7UgD9w'
  // console.log(link)
  if (!headers) {
    headers = {}
    headers['X-Ca-Signature'] = md5(link).toUpperCase()
  } else {
    headers['X-Ca-Signature'] = md5(link).toUpperCase()
  }
  return headers
}
export function postFn (url, data, headers) {
  headers = sortFn1(url, data, 'post', headers)
  return request({
    url: `${url}`,
    method: 'post',
    data: data,
    headers
  })
}

export function getFn (url, data, headers) {
  headers = sortFn1(url, data, 'get', headers)
  return request({
    url: `${url}`,
    method: 'get',
    params: data,
    headers
  })
}
export function successTip (msg, duration) {
  Toast.success({
    duration: duration || 1000,
    message: msg
  })
}
export function errorTip (msg, duration) {
  Toast({
    duration: duration || 1000,
    message: msg
  })
}
export function loadingTip (msg) {
  Toast.loading({
    duration: 0, // 持续展示 toast
    message: msg
  })
}
export function clearTip () {
  Toast.clear()
}
