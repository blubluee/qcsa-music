import axios from 'axios'
import router from '@/router'
import { Message } from 'element-ui'
import qs from 'qs'
import store from '@/store'

// 创建一个axios实例
const service = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 5000
})

service.defaults.responseType = 'json'
service.defaults.withCredentials = true
// service.defaults.transformRequest = [
//   data => {
//     return qs.stringify(data)
//   }
// ]
// service.defaults.validateStatus = function() {
//   return true
// }

// 请求拦截器
service.interceptors.request.use(
  config => {
    
    return config
  },
  error => {
    Message.error({ message: '请求超时!' })
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    const status = response.status
    if (status === 200) {
      return res
    } else if (status === 301) {
      Message.error({ message: '请先登录!' })
      router.replace({ path: 'login '})
      return;
    } else if (status === 400) {
      Message.error({ message: data.msg})
      return;
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log(error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service