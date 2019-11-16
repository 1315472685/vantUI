import request from '@/utils/request'
import { Toast } from 'vant'
export function postFn (url, data, headers) {
  return request({
    url: `${url}`,
    method: 'post',
    data: data,
    headers
  })
}

export function getFn (url, data, headers) {
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
