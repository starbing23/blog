<template>
  <div id="app">
    <div class="bg"></div>
    <b-navbar toggleable type="inverse" variant="">
      <b-link to="/" class="navbar-brand">
          <span>Bin</span>
      </b-link>
      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item v-for="nav in navs">
            <router-link :to="nav.link" class="nav-link">{{nav.name}}</router-link>
          </b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>
    <router-view></router-view>
  </div>
</template>

<script>

import Navs from './navs.js'

export default {
  name: 'app',
  data () {
    return {
      navs: Navs.navs
    }
  },
  methods: {
    test: function() {
      console.log('test');
      // this.$resource('/api/products').get().then(function(response) {
      //   response.json().then(function(result) {
      //     console.log(result)
      //   })
      // })

      var xhrCors = 'withCredentials' in new XMLHttpRequest();
      console.log(xhrCors);
      
      var xhr = new XMLHttpRequest();
      xhr.open('GET','http://localhost:3000/api/products');
      xhr.onload = function(e){
          var data = JSON.parse(this.response);
          console.log(data)
      };
      xhr.send();
    }
  }
}
</script>

<style>
html, body, #app {
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.bg {
  position: absolute;
  top: 0;
  z-index: -1;
  width: 100%;
  height: 100vh;
  background-image: url('./img/profile-background.jpg');
  background-position: center;
}
</style>
