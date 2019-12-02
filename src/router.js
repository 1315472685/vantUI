import Vue from 'vue'
import Router from 'vue-router'
import user from '@/views/user/user'
import login from '@/views/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      name: 'user',
      component: user,
      meta: {
        title: '商家中心'
      }
    }
  ]
})
