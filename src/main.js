import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'lib-flexible'
import './promise.js'
import vant from './vant/vant'
import { getFn, postFn, loadingTip, clearTip, errorTip, successTip } from '@/api/axiosVant'
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
