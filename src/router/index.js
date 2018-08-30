import Vue from 'vue'
import Router from 'vue-router'
import emails from '@/components/emails/emails'
import addressList from '@/components/addressList/addressList'
import todo from '@/components/todo/todo'
import personel from '@/components/personel/personel'

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
    },
    {
      path: '/addressList',
      name: 'addressList',
      component: addressList
    },
    {
      path: '/todo',
      name: 'todo',
      component: todo
    },
    {
      path: '/personel',
      name: 'personel',
      component: personel
    }
  ],
  linkActiveClass: 'active'// 设置默认激活类名
})
