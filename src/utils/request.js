import axios from 'axios'
import { errorTip } from '@/api/axiosVant'
console.log(process.env)
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 100000, // request timeout
  headers: {
    'Cache-Control': 'no-cache, no-store, must-revalidate'
  }
})

let noTip = false// 是否提示错误信息
// request interceptor
service.interceptors.request.use(
  config => {
    if (config.headers.toastMsg) {
      noTip = true
    } else {
      noTip = false
    }
    return config
  },
  error => {
    // console.log(error) // for debug
    return Promise.reject(error)
  }
)
service.interceptors.response.use(

  // / **
  // * Determine the request status by custom code
  // * Here is just an example
  // * You can also judge the status by HTTP Status Code
  // * status为100token过去
  // */
  response => {
    if (response.data.status !== 200) {
      if (!noTip) errorTip(response.data.message)
    }
    return response
  },
  error => {
    if (!noTip) errorTip(error)
    return Promise.reject(error)
  }
)
export default service
