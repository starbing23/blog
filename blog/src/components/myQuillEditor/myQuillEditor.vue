<template>
    <div>
        <quill-editor v-if="isAdmin === false" ref="myTextEditor"
                    v-model="content"
                    :options="readerOption">
        </quill-editor>
        <quill-editor v-else ref="myTextEditor"
                        v-model="content"
                        :options="editorOption">
        </quill-editor>
    </div>
</template>
<script>
    import Quill from 'quill'
    import { ImageImport } from './ImageImport.js'
    import { ImageResize } from './ImageResize.js'

    Quill.register('modules/imageImport', ImageImport)
    Quill.register('modules/imageResize', ImageResize)

    export default {
        name: 'testQuillEditor',
        data() {
            return {
                content: this.initContent,
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
            initContent: {
                default: ''
            },
        },
        computed: {
            editor() {
                return this.$refs.myTextEditor.quill
            },  
        },
        async mounted() {
            const self = this;
            const id = this.$route.query.id;

            //If there is image change
            // this.editor.on('text-change', async function(delta, oldDelta, source) {
            //   const operation = delta.ops[1] ? delta.ops[1] : delta.ops[0]; //At first operation, the ops only be 0
            //   if(operation.insert && operation.insert.image) {
            //     const imageData = operation.insert.image;
            //     console.log('upload img = ', imageData);
            //     const result = await self.postImg(imageData);
            //     if(result && result.data) {
            //       const imageSource = result.data.imageSource;

            //     }else {
            //       console.log('post Img fail')
            //     }
            //   }
            // });
            this.editor.getModule('toolbar').addHandler('image', async function() {
            console.log('ttt')
            })
        },
        methods: {

        }
    }
</script>


