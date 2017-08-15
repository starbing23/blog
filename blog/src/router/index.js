import Vue from 'vue'
import Router from 'vue-router'
import BootstrapVue from 'bootstrap-vue'
import VueQuillEditor from 'vue-quill-editor'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Main from '@/page/index'
import Profile from '@/page/Profile'
import Blogs from '@/page/Blogs'
import Blog from '@/page/Blog'
import Works from '@/page/Works'
import Contact from '@/page/Contact'
import Login from '@/page/Login/Login'
import Edit from '@/page/Edit/Edit'

Vue.use(Router)
Vue.use(VueQuillEditor)
Vue.use(BootstrapVue)

export default new Router({
  routes: [
    {
      name: 'Index',
      path: '/',
      component: Main
    },

    {
      name: 'Profile',
      path: '/Profile',
      component: Profile
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
    },
    {
      name: 'Edit',
      path: '/Edit',
      component: Edit,
      props: {
        isAdmin: isAdmin()
      }   
    },
    {
      name: 'Login',
      path: '/Login',
      component: Login
    },
  ]
})

function isAdmin() {
  if(localStorage && localStorage.session) {
    return true;
  }
  return false;
}
