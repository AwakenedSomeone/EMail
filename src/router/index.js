import Vue from 'vue'
import Router from 'vue-router'
import emails from '@/components/emails/emails'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // +++++++++++++++++++++ 首页
      path: '/',
      redirect: '/emails'
    },
    {
      path: '/emails',
      name: 'emails',
      component: emails
    }
  ]
})
