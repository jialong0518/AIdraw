import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import echarts from 'echarts'
import '@/styles/index.scss' // global css
import VueCoreVideoPlayer from 'vue-core-video-player'

import App from './App'
import store from './store'
import router from './router'
import '@/icons' // icon
import '@/permission' // permission control

import Multiselect from 'vue-multiselect'
Vue.component('multiselect', Multiselect)


import Login from '@/views/login'
Vue.component("Login", Login);//全局自定义组件

import FindPassWord from '@/views/findPassWord'
Vue.component("Forget", FindPassWord);//全局自定义组件

import Register from '@/views/register'
Vue.component("Register", Register);//全局自定义组件


/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
Vue.use(VueCoreVideoPlayer)

Vue.prototype.$echarts = echarts

import { Message } from 'element-ui';
Vue.prototype.$message = Message 

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  data() {
    return {
      LOGINSTATE: false,
      FORGETSTATE: false,
      REGISTERSTATE: false,
    };
  },
  router,
  store,
  render: h => h(App)
})
