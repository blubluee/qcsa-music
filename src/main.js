import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import router from './router'
import store from './store'
import '@/assets/styles/common.css'
import '@/assets/styles/reset.styl'
import '@/assets/styles/iconfont.css'
Vue.config.productionTip = false 
Vue.use(ElementUI)

// 将接口挂载到Vue对象上
import api from '@/api'
Vue.prototype.$API = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
