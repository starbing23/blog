<template>
  <div class="edit">
    <div class="edit-container">
      <input class="edit-title" type="text" placeholder="Title">
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="readerOption">
        </quill-editor>
        <div class="html ql-editor" v-html="content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Quill from 'quill'
import { ImageImport } from './ImageImport.js'
import { ImageResize } from './ImageResize.js'

Quill.register('modules/imageImport', ImageImport)
Quill.register('modules/imageResize', ImageResize)

export default {
  name: 'Edit',
  data () {
    return {
      content: '\<button onClick="console.log(`aaa`)"\>test\<\/button\>',
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
          toolbar:false,
        }
      }
    }
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
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    }
  },
  mounted() {
    //console.log('this is my editor', this.editor)
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
    }

    .ql-container .ql-editor {
      min-height: 20em;
      padding-bottom: 1em;
      max-height: 25em;
    }
}
</style>

