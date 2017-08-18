<template>
  <div class="edit">
    <div class="edit-container">
      <input class="edit-title" type="text" placeholder="Title">
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
                      @ready="onEditorReady($event)">
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
import Blog from '../../model/blog.js'

Quill.register('modules/imageImport', ImageImport)
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'Edit',
  data () {
    return {
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
      console.log('editor blur!', this.content)
    },

    onEditorFocus(editor) {
      console.log('editor focus!', this.content)
    },

    onEditorReady(editor) {
      console.log('editor ready!', this.content)
    },

    onEditorPost() {
      this.$http.post('/api/postBlog').then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error)
      })
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    }
  },
  mounted() {
    const art = this.$route.query.id;
    if(art) {
      this.$http.get('/api/Blog/'+art).then((response) => {
        console.log(response);
      }).catch((error) => {
        this.$router.replace({ name: '404'});
      })
    }else if(!this.isAdmin) {
      this.$router.replace({ name: '404'});
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

