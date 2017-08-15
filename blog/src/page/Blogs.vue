<template>
  <div class="blogs">
    <div class="blogs-container">
      <h3><strong>Newest Blogs</strong></h3>
      <div class="blog" v-for="Blog in Blogs">
        <router-link :to="{ name: 'Blog', params: { id: Blog.id }}">
          <img src="../img/head.jpg" width="250px">
          <!-- <a class="blog-pic" href="javascript:void(0)" v-bind:style="{background: 'url(' + Blog.pic + ')'}"></a> -->
          <div class="blog-content">
            <h3 class="blog-title">{{Blog.title}}</h3>
            <div class="blog-body">
              {{Blog.body}}
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Blogs',
  data () {
    return {
      Blogs: [
        {
          name: 'Blog1',
          pic: '../img/profile-header.png',
          title: 'I am blog 1 sadfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff',
          body: 'I am body asd fdff fffff ffffff fffff fff ffff fffffff ffffffff fffffff ffffff ffff ffffff fffffffffffffffffffffffffffffff ffffffffff ffff ffffaaaa aaaaaaI am body asdfdffff ffff fffff ffffff ffffffff ffffffff ffffffff ffff fffffff fffffffff fffff ffff fffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaI am body asdfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaaI am body asdfdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffaaaaaaaaaa',
          id: '00',

        },
        {
          name: 'Blog2',
          pic: '../img/head.jpg',
          title: 'I am blog 2',
          body: 'I am body',
          id: '01'
        }
      ],
      content: '<h2>I am Example 1</h2>',
      editorOption: {},
    }
  },
  methods: {
  },
  computed: {
  },
  mounted() {
  }
}
</script>
<style lang="scss">
a {
  text-decoration: none;
  color: black;
}

.blogs {
    width:100%;
    min-height: calc(100% - 72px);
    background: #f5f5f5;
    overflow: auto;

    .blogs-container {
      width: 65%;
      min-width: 640px;
      max-width: 960px;
      margin: auto;
      padding: 30px 0;
      text-align: left;

      .blog {
        width:100%;
        margin-bottom: 30px;
        padding: 20px 0;
        border-top: 1px solid #87a6bc;
        border-bottom: 1px solid #87a6bc;

          .blog-pic {
            background-size: cover; 
            background-repeat: no-repeat; 
            background-position: center center;
          }
          
          .blog-content {
            display: inline-block;
            width: calc(100% - 290px);
            vertical-align: top;
            margin-left: 20px;

            .blog-title {
              width:100%;
              margin-bottom: 10px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #2e4453;
            }

            .blog-body {
              width:100%;
              height:1.4em;
              height:4.2em;
              overflow: hidden;
              position:relative;
              color: #2e4453;
            }

            .blog-body::after {
              content: " ";
              font-weight: bold;
              position: absolute;
              bottom: 0;
              right: 32px;
              padding: 0 60px 1px 0px;
              height: 1.4em;
              background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(245, 245, 245, 1));
            }
          }
      }
    }
}
</style>

