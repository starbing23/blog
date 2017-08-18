<template>
  <div class="error">
    <img src="../../img/tc-404.jpg">
  </div>
</template>
<script>
export default {
  name: 'Error',
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
.error {
    width:100%;
    min-height: calc(100% - 72px);
    background: white;
    overflow: auto;

    img {
        position: relative;
        top: calc(50vh - 235px);
    }
}
</style>

