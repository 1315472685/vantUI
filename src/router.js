import Vue from 'vue'
import Router from 'vue-router'
import newDetail from './views/newDetail/newDetail'
import detail from './views/newDetail/detail'
import giftDetail from './views/newDetail/giftDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'detail',
      component: detail
    },
    {
      path: '/giftDetail',
      name: 'giftDetail',
      component: giftDetail
    },
    {
      path: '/newDetail',
      name: 'newDetail',
      component: newDetail
    },
    {
      path: '/detail',
      name: 'detail',
      component: detail
    }
  ]
})
