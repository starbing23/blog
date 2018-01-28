import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

const api = 'http://localhost:8080'

export default {
    async login(params) {
        const result = await Vue.http.post(api+'/api/user/signIn', params)
        return result;
    },

    async isLogin() {
        const result = await Vue.http.get(api+'/api/user/isLogin');
        return result;
    },

    async logout() {
        const result = await Vue.http.post(api+'/api/user/logOff')
        return result;
    },
}