<template>
  <div class="blogs">
    <ul>
      <li v-for="Blog in Blogs">
        <router-link :to="{ name: 'Blog', params: { id: Blog.id }}">{{ Blog.name }}</router-link>
      </li>
    </ul>
    <div>
      <div class="quill-editor-example">
        <!-- quill-editor -->
        <quill-editor ref="myTextEditor"
                      v-model="content"
                      :options="editorOption"
                      @blur="onEditorBlur($event)"
                      @focus="onEditorFocus($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
        <div class="html ql-editor" v-html="content"></div>
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
          id: '00'
        },
        {
          name: 'Blog2',
          id: '01'
        }
      ],
      content: '<h2>I am Example 1</h2>',
      editorOption: {},
    }
  },
  methods: {
    onEditorBlur(editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      console.log('editor ready!', editor)
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    }
  },
  mounted() {
    console.log('this is my editor', this.editor)
  }
}
</script>
<style lang="scss">
.blogs {
    width:100%;
    min-height: calc(100% - 72px);
    background: #f5f5f5;
    overflow: auto;

    .ql-container .ql-editor {
      min-height: 20em;
      padding-bottom: 1em;
      max-height: 25em;
    }
}
</style>

