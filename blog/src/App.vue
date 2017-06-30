<template>
  <div id="app">
    <b-navbar toggleable type="inverse" variant="success">
      <b-link class="navbar-brand">
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
export default {
  name: 'app',
  data () {
    return {
      navs: [
        {
          name: 'Works',
          link: {
            name: 'Works'
          }
        },
        {
          name: 'Blogs',
          link: {
            name: 'Blogs'
          }
        },
        {
          name: 'Contact',
          link: {
            name: 'Contact'
          }
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
