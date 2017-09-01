import Vue from 'vue'

const api = 'http://localhost:3001'

export default {
    async login(params) {
        const result = await Vue.http.post(api+'/api/user/signIn', params)
        return result;
    }
}