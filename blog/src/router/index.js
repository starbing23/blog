import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Foos from '@/components/Foos'
import Foo from '@/components/Foo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      name: 'Foos',
      path: '/foos',
      component: Foos
    },
    {
      name: 'Foo',
      path: '/foo/:id',
      component: Foo
    }
  ]
})
