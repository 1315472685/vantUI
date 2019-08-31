import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import 'lib-flexible'
import { Circle, Field, Toast } from 'vant'
Vue.use(Circle)
Vue.use(Field)
Vue.use(Toast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
