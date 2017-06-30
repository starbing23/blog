<template>
    <ul>
        <li v-for="Blog in Blogs">
            <router-link :to="{ name: 'Blog', params: { id: Blog.id }}">{{ Blog.name }}</router-link>
        </li>
    </ul>
</template>
<script>
export default {
  name: 'Blogs',
  data () {
    return {
      Blogs: [
        {
          name: 'Blog1',
          id: '00'
        },
        {
          name: 'Blog2',
          id: '01'
        }
      ]
    }
  }
}
</script>
