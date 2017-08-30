import Vue from 'vue'

const api = 'http://localhost:3001'

export default {
    async getBlog(id) {
        const result = await Vue.http.get(api+'/api/blog/get?id='+id)
        return result;
    },

    async postImg(imageData) {
        const result = await Vue.http.post(api+'/api/blog/postImage', imageData)
        return result;
    },

    async postBlog(content) {
        const result = await Vue.http.post(api+'/api/blog/post', content)
        return result;
    },
}