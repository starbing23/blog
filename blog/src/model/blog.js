import Vue from 'vue'

const api = 'http://localhost:8080'

export default {
    async getBlog(id) {
        const result = await Vue.http.get(api+'/api/blog/get?id='+id)
        return result;
    },

    async getBlogs(page) {
        const result = await Vue.http.get(api+'/api/blog/getAll?page='+page)
        return result;
    },

    async getEdit() {
        const result = await Vue.http.get(api+'/api/blog/edit')
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

    async updateBlog(content) {
        const result = await Vue.http.put(api+'/api/blog/update', content)
        return result;
    },

    likeChanged(params) {
        Vue.http.put(api + '/api/blog/likeChanged', params);
    }
}