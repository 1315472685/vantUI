import Vue from 'vue'
import Router from 'vue-router'
import newDetail from './views/newDetail/newDetail'
import detail from './views/newDetail/detail'
import giftDetail from './views/newDetail/giftDetail'
import test from './views/test'
import list from './views/list'
import getterSetter from './views/getterSetter'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'getterSetter',
      component: getterSetter
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/list',
      name: 'list',
      component: list
    },
    {
      path: '/detail',
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
