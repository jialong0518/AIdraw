import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
let loading = null //定义loading变量
// import { indexOf } from 'core-js/fn/array'

// create an axios instance
const service = axios.create({
    
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  //发版测试 
  // baseURL: 'https://uat.huanqiujr.com',
  baseURL: 'https://huanqiu-ai.com',
  //本地
  // baseURL: '',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  headers: {
    Accept: "application/json,text/javascript,*/*",
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "*",
    // "Access-Control-Expose-Headers": "*",
    'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'
  },
})
// const loading = this.$loading({
//   lock: true,
//   text: 'Loading',
//   spinner: 'el-icon-loading',
//   background: 'rgba(0, 0, 0, 0.7)'
// });
// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    config.headers['token'] = sessionStorage.getItem('token')
    config.headers['phone'] = sessionStorage.getItem('phone')
    config.headers['source'] = 'web'
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
    }
    // showFullScreenLoading()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // loading.close();
    // if the custom code is not 20000, it is judged as an error.
    if (res.code === 2000) {
      endLoading()
      if(res.code != 143 && res.code != 404){
        Message({
          message: res.msg || 'Error',
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }

    if (res.code === 1000) {
      endLoading()
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      // tryHideFullScreenLoading()
      return res
    }
  },
  error => {
    endLoading()
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

//开始 加载loading
let startLoading=()=>{
  loading = Loading.service({
      lock: true,
      text: '拼命加载中...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
  })
}
//结束 取消loading加载
let endLoading=()=>{
  loading.close()
}
 
//showFullScreenLoading() 与 tryHideFullScreenLoading() 目的是合并同一页面多个请求触发loading
 
let needLoadingRequestCount = 0 //声明一个变量
 
let showFullScreenLoading=()=> {
  if (needLoadingRequestCount === 0) { //当等于0时证明第一次请求 这时开启loading
    startLoading()
  }
  needLoadingRequestCount++ //全局变量值++
}
 
let tryHideFullScreenLoading=()=> {
  if (needLoadingRequestCount <= 0) return //小于等于0 证明没有开启loading 此时return
  needLoadingRequestCount-- //正常响应后 全局变量 --
  if (needLoadingRequestCount === 0) {  //等于0 时证明全部加载完毕 此时结束loading 加载
    endLoading()
  }
}
 
export default service
