<template>
  <div class="blogs">
    <div class="blogs-container">
      <h3 class="blog-new"><strong>Newest Blogs</strong></h3>
      <router-link :to="{ name: 'Edit'}" v-if="isAdmin"><button class="creat-button btn btn-primary float-right">Create</button></router-link>
      <div class="blog" v-for="blog in blogs">
        <router-link :to="{ name: 'Edit', query: {id: blog.blogId}}">
          <img v-if="blog.headImg" :src="blog.headImg" width="250px" class="blog-image"> 
        </router-link>
        <div class="blog-content">
          <router-link :to="{ name: 'Edit', query: {id: blog.blogId}}">
            <h3 class="blog-title">{{blog.title}}</h3>
            <div class="blog-body">
              {{blog.description}}
            </div>
          </router-link>
          <div class="manipulate">
            <like-component :id="blog.blogId" @likeChanged="likeChanged"></like-component>
            {{blog.like}}
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Blog from '../model/blog.js'
import likeComponent from '../components/like/like.vue'

export default {
  name: 'Blogs',
  data () {
    return {
      blogs: [],
      page: 0,
      editorOption: {},
    }
  },
  props: {
    isAdmin: {
      default: false
    }
  },
  components: {
    likeComponent: likeComponent
  },
  methods: {
    async getBlogs() {
      const result = await Blog.getBlogs(this.page);
      if(result.body && result.body.success) {
        const resultBlogs = result.body.data.blogs;
        if(this.isAdmin) console.log('Get blogs success = ', resultBlogs);
        this.blogs = resultBlogs;
      }else {
        this.$modal.show('dialog', {
            title: 'Get blogs failed!',
            text: result.body.message
        });
      }
    },

    likeChanged(params) {
      let blog = this.blogs.find((blog) => {
        return blog.blogId === params.id;
      })
      if(blog) blog.like = params.like ? blog.like+1 : blog.like-1
      Blog.likeChanged(params)
    }
  },
  computed: {
  },
  mounted() {
    this.getBlogs();
  }
}
</script>
<style lang="scss">
a {
  text-decoration: none;
  color: black;

  &:hover {
    text-decoration: none;
  }
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
    
      .blog-new {
        display: inline-block;
      }

      .creat-button {
        margin-top: -5px;
      }

      .blog {
        width:100%;
        margin-bottom: 30px;
        padding: 20px 0;
        border-top: 1px solid #87a6bc;
        border-bottom: 1px solid #87a6bc;
        position: relative;

          .blog-image {
            object-fit: cover;
            width: 250px;
            height: 150px;
            margin-right: 25px;
          }
          
          .blog-content {
            display: inline-block;
            width: calc(100% - 290px);
            vertical-align: top;

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
              word-wrap: break-word;
            }

            .blog-body::after {
              content: " ";
              font-weight: bold;
              position: absolute;
              bottom: 0;
              right: 0;
              padding: 0 60px 1px 0px;
              height: 1.4em;
              background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(245, 245, 245, 1));
            }

            .manipulate {
              position: absolute;
              bottom: 20px;
              right: 0px;
              height: 1.5rem;
            }
          }
      }
    }
}
</style>

