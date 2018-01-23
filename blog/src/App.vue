<template>
  <div id="app">
    <div class="bg"></div>
    <b-navbar toggleable type="dark" variant="">
      <b-link to="/" class="navbar-brand">
          <span>Bin</span>
      </b-link>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav is-nav-bar class="ml-auto">
          <b-nav-item v-for="nav in navs" :key="nav.name">
            <router-link :to="nav.link" class="nav-link">{{nav.name}}</router-link>
          </b-nav-item>
          <b-nav-item>
            <a href="#" class="nav-link" v-if="!isAdmin" @click="loginModal">Login</a>
            <a href="#" class="nav-link" v-else @click="logout">Logout</a>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view :isAdmin="isAdmin"></router-view>
    <login-modal :initIsAdmin="isAdmin" v-on:loginSuccess="loginSuccess"/>
    <v-dialog/>
  </div>
</template>

<script>

import Navs from './navs.js'
import Modal from './components/modal/main.js'
import Session from './router/session.js'
import userModel from './model/user.js'

export default {
  name: 'app',
  data () {
    return {
      navs: Navs.navs,
    }
  },
  props: {
    isAdmin: {
      default: false
    }
  },
  components: Modal,
  methods: {
    loginModal() {
      this.$modal.show('loginModal');
    },
    async logout() {
      const result = await userModel.logout();
      if(result.status === 200) {
        const success = result.body.success;
        if(success) {
          this.$modal.show('dialog', {
              title: 'Logout sucess!',
              text: 'Your logout success!'
          });
          this.$emit('logoutSuccess');
        }
      }
    },
    loginSuccess() {
      this.$emit('loginSuccess');
    },
  },
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
