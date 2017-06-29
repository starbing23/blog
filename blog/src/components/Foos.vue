<template>
    <ul>
        <li v-for="foo in foos">
            <router-link :to="{ name: 'Foo', params: { id: foo.id }}">{{ foo.name }}</router-link>
        </li>
    </ul>
</template>
<script>
export default {
  name: 'Foos',
  data () {
    return {
      foos: [
        {
          name: 'foo1',
          id: '00'
        },
        {
          name: 'foo2',
          id: '01'
        }
      ]
    }
  }
}
</script>
