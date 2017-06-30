import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Hello from '@/components/Hello'
import Blogs from '@/page/Blogs'
import Blog from '@/page/Blog'
import Works from '@/page/Works'
import Contact from '@/page/Contact'

Vue.use(Router)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      name: 'Blogs',
      path: '/Blogs',
      component: Blogs
    },
    {
      name: 'Blog',
      path: '/Blog/:id',
      component: Blog
    },
    {
      name: 'Works',
      path: '/Works',
      component: Works
    },
    {
      name: 'Contact',
      path: '/Contact',
      component: Contact
    }
  ]
})
