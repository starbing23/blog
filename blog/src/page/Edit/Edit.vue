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

      console.log('Post blog = ', this.editor.editor.delta);
      let result = blogModel.postBlog(this.editor.editor.delta);
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
    if(id) {
      const result = await blogModel.getBlog(id);
      const response = result.body;
      if(response.code === '200') {
        const data = response.data;
        const blog = data.blog;
        this.title = blog.title;
        this.content = blog.body;
        this.isAdmin = data.editable;
      }else {
        this.$router.push({ name: '404'});
      }
    }else if(!this.isAdmin) {
      this.$router.push({ name: '404'});
    }
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

