<template>
  <div class="edit">
    <div class="edit-container">
      <input class="edit-title" type="text" placeholder="Title" v-model="title">
      <div class="quill-editor">
        <!-- quill-editor -->
        <quill-editor v-if="isAdmin === false" ref="myTextEditor"
                      v-model="content"
                      :options="readerOption">
        </quill-editor>
        <quill-editor v-else ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)"
                      @change="onEditorChange($event)">
        </quill-editor>
        <div v-if="isAdmin" class="float-right">
          <button class="btn btn-primary" @click="onEditorPost()">POST</button>
          <button class="btn" @click="onEditorCancel()">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Quill from 'quill'
import { ImageImport } from './ImageImport.js'
import { ImageResize } from './ImageResize.js'
import blogModel from './../../model/blog.js'

Quill.register('modules/imageImport', ImageImport)
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'Edit',
  data () {
    return {
      title: '',
      content: '',
      readOnly: false,
      editorOption: {
        modules: {
          imageImport: true,
          imageResize: {
            displaySize: true
          }
        }
      },
      readerOption: {
        modules: {
          toolbar:false
        },
        readOnly: true,
      }
    }
  },
  props: {
    isAdmin: {
      default: false
    },
  },
  methods: {

    onEditorBlur(editor) {
      // console.log('editor blur!', editor)
    },

    onEditorFocus(editor) {
      // console.log('editor focus!', editor)
    },

    onEditorReady(editor) {
      // console.log('editor ready!', editor)
    },

    onEditorChange(editor) {
      // console.log('editor change!', editor)
    },

    async onEditorPost() {
      if(this.isAdmin) {
        console.log('Edit title = ', this.title);
        console.log('Edit content = ', this.content);
      }
      const delta = this.editor.editor.delta;
      const description = this.description(this.editor.getText());
      const data = {
        title: this.title,
        // body: JSON.stringify(delta),
        body: JSON.stringify(this.content),
        description: description,
      };
      let result = await blogModel.postBlog(data);
      if(result.body && result.body.success) {
        if(this.isAdmin) console.log('Post blog success = ', result);
        const blogId = result.body.data.blogId;
        this.$router.push({ name: 'Edit', query: {id: blogId}});
      }else {
        this.$modal.show('dialog', {
            title: 'Post failed!',
            text: 'Something wrong with post blog!'
        });
      }
    },

    description(content) {
      content = JSON.stringify(content);
      if(content.length >= 150) content = content.substring(0, 150);
      const description = content.split('\\n')[0];  //Get the first paragraph as description.
      return description.slice(1);
    },

    async postImg(imageData) {
      let result = await blogModel.postImg(imageData);
      return result;
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    }
  },
  async mounted() {
    const self = this;
    const id = this.$route.query.id;

    //If there is image change
    this.editor.on('text-change', async function(delta, oldDelta, source) {
      const operation = delta.ops[1] ? delta.ops[1] : delta.ops[0]; //At first operation, the ops only be 0
      if(operation.insert && operation.insert.image) {
        const imageData = operation.insert.image;
        const result = await self.postImg(imageData);
        if(result && result.data) {
          const imageSource = result.data.imageSource;

        }else {
          console.log('post Img fail')
        }
      }
    });
    //if it's edit an exsit blog
    if(id) {
      const result = await blogModel.getBlog(id);
      const response = result.body;
      if(response.code === '200') {
        const blog = response.data.blog;
        this.title = blog.title;
        this.content = JSON.parse(blog.body);
      }else {
        this.$router.push({ name: '404'});
      }
    }else if(!this.isAdmin) {
      this.$router.push({ name: '404'});
    };

    //auto save

  }
}
</script>
<style lang="scss">
.edit {
    width:100%;
    min-height: calc(100% - 72px);
    background: #f5f5f5;
    overflow: auto;

    .edit-container {
      width: 65%;
      min-width: 640px;
      max-width: 960px;
      margin: auto;

      .edit-title {
        width: 100%;
        background-color: #f5f5f5;
        height: 50px;
        margin: 20px 0;
        border: 1px solid #cdcfd2;
        border-radius: 3px;
        padding: 10px;
        font-size: 30px;
      }

      .quill-editor {
        margin-bottom: 20px;
      }
    }

    .ql-container .ql-editor {
      min-height: 20em;
      padding-bottom: 1em;
      max-height: 25em;
    }
}
</style>

