import axios from 'axios'
import { errorTip } from '@/api/axiosVant'
const service = axios.create({
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 10000 // request timeout
})
let noTip = false// 是否提示错误信息
// request interceptor
service.interceptors.request.use(
  config => {
    console.log(config)
    if (localStorage.getItem('token')) {
      config.headers['token'] = localStorage.getItem('token')
    }
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
