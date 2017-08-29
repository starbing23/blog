import Vue from 'vue'

export default {
    async getBlog(id) {
        let result = await Vue.http.get('/api/blog/get?id='+id).catch(function(err) {
            console.log(err);
            return {};
        });
        return result;
    },

    async postImg(imageData) {
        let result = await Vue.http.post('/api/blog/postImage', imageData).catch(function(err) {
            console.log(err);
            return {};
        });
        return result;
    },

    async postBlog(content) {
        let result = await Vue.http.post('/api/blog/post', content).catch(function(err) {
            console.log(err);
            return {};
        });
        return result;
    },
}