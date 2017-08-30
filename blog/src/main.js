// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import VModal from 'vue-js-modal'

Vue.component('icon', Icon)
Vue.use(VueResource);
Vue.use(VModal, {dialog: true})

Vue.http.options.credentials = true;
Vue.http.options.crossOrigin = true;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  data: {
    // isAdmin: true,
  },
  computed: {
    // isAdmin: () => {
    //   return true;
    // }
  },
  components: { 
    App
  }
})
