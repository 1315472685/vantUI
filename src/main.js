import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'lib-flexible'
import vant from './vant/vant'
import 'c-swipe/dist/swipe.css'
import { Swipe, SwipeItem } from 'c-swipe'
import { getFn, postFn, loadingTip, clearTip, errorTip, successTip } from '@/api/axiosVant'
// 全局注册组件
Vue.component('swipe', Swipe)
Vue.component('swipe-item', SwipeItem)
Vue.use(vant)
Vue.prototype.$get = getFn
Vue.prototype.$post = postFn
Vue.prototype.$loadingTip = loadingTip
Vue.prototype.$clearTip = clearTip
Vue.prototype.$errorTip = errorTip
Vue.prototype.$successTip = successTip

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
