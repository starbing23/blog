<template>
  <div class="works">
      <div class="works-container">
          <div class="work-container" v-for="(work, index) in works">
                <div class="row" v-if="index % 2 === 0">
                    <p class="col-md-6">{{work.name}}</p>
                    <p class="col-md-6">{{work.body}}</p>
                </div>
                <div  class="row" v-else>
                    <p class="col-md-6">{{work.body}}</p>
                    <p class="col-md-6">{{work.name}}</p>
                </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  name: 'Works',
  data () {
    return {
        works: [
            {name: 'aaa', body: 'aaa1'},
            {name: 'bbb', body: 'bbb1'},
            {name: 'aaa', body: 'aaa1'},
            {name: 'aaa', body: 'aaa1'},
        ]
    }
  },
  methods: {
  }
}
</script>
<style lang="scss">
.works {
    width:100%;
    min-height: calc(100% - 72px);
    background: #f5f5f5;
    overflow: auto;

    .works-container {

        .work-container {

        }
    }
}
</style>
