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
                      :options="editorOption">
        </quill-editor>
        <form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti">
          <input style="display: none" :id="imageInputId" type="file" name="avator" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg('uploadFormMulti')"><!--style="display: none"-->
        </form>
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
      },
      imageInputId: 'imageInputId',
    }
  },
  props: {
    isAdmin: {
      default: false
    },
  },
  methods: {
    async onEditorPost() {
      if(this.isAdmin) {
        console.log('Edit title = ', this.title);
        console.log('Edit content = ', this.content);
      }
      const delta = this.editor.editor.delta;
      const description = this.description(this.editor.getText());
      const blogHeadImg = delta.ops.find((element)=> {
        return element.insert.image;
      });
      const imgUrl = blogHeadImg ? blogHeadImg.insert.image : null;
      const data = {
        title: this.title,
        // body: JSON.stringify(delta),
        body: JSON.stringify(this.content),
        description: description,
        headImg: imgUrl,
      };
      let id = this.$route.query.id;
      let result = {}

      if(id) {
        data.blogId = id;
        result = await blogModel.updateBlog(data);
      }else {
        result = await blogModel.postBlog(data);
      }

      if(result.body && result.body.success) {
        if(this.isAdmin) console.log('Post blog success = ', result);
        id = result.body.data.blogId ? result.body.data.blogId : id;
        this.$modal.show('dialog', {
            title: 'Post success!',
            text: result.body.message
        });
        this.$router.push({ name: 'Edit', query: {id: id}});
      }else {
        this.$modal.show('dialog', {
            title: 'Post failed!',
            text: result.body.message
        });
      }
    },

    description(content) {
      content = JSON.stringify(content);
      if(content.length >= 150) content = content.substring(0, 150);
      //Get the first paragraph not blank as description.
      const description = content.slice(1).split('\\n').find((element)=> {
        return element !== ''
      });
      console.log('ttt', description)
      return description;
    },

    async postImg(imageData) {
      let result = await blogModel.postImg(imageData);
      return result;
    },

    async imageHandler(image) {
      if (image) {
        const fileInput = $('#' + this.imageInputId);
        fileInput.click()
      }
    },

    async uploadImg(id) {
      let formData = new FormData();
      let file = $('#' + this.imageInputId)[0].files[0];
      formData.append('files', file);
      console.log('ssfsdfsdfds', formData)
      const result = await blogModel.postImg(formData);
      const response = result.body;
      if(response.success) {
        let imgUrl = response.data;
        this.addImgRange = this.editor.getSelection();
        imgUrl = imgUrl.indexOf('http') != -1 ? imgUrl : 'http:' + imgUrl;
        this.editor.insertEmbed(this.addImgRange != null?this.addImgRange.index:0, 'image', imgUrl, Quill.sources.USER);
      }else {
        this.$modal.show('dialog', {
            title: 'Upload image failed!',
            text: 'Please try again!'
        });
      }
      const fileInput = $('#' + this.imageInputId);
      fileInput[0].value = '';
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quill
    },

  },
  async mounted() {
    const self = this;
    const id = this.$route.query.id;

    //Customer image upload
    this.editor.getModule('toolbar').addHandler('image', this.imageHandler);

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

