import UserModel from '../model/user.js'

const isAdmin = async () => {
    const result = await UserModel.isLogin();
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