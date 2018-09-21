import Vue from 'vue'
import UserModel from '../model/user.js'

const isAdmin = async () => {
    const result = await UserModel.isLogin();
    Vue.http.headers.common['X-CSRF-TOKEN'] = Vue.$cookies.get('XSRF-TOKEN');
    console.log(Vue.$cookies.get('XSRF-TOKEN'));
    if(result.status === 200) {
        const success = result.body.success;
        if(success) {
           return true;
        }else {
            return false;
        }
    }else {
        return false;
    }
};

export default {
    isAdmin: isAdmin
}