<template>
  <modal name="loginModal" class="loginModal" 
        :width="600" 
        :height="350">
      <div class="login-container">
        <div class="head">
            <img src="../../img/head.jpg" alt="head" height="128px">
            <p>Login</p>
        </div>
        <div class="login-content">
            <p>
                <input class="login-input" type="text" v-model="userName" placeholder="User Name">
            </p>
            <p>
                <input class="login-input" type="password" v-model="password" placeholder="Password">
            </p>
            <div class="text-left remeber"><small><input type="checkbox" v-model="remeber"> remeber</small></div>
            <p>
                <button class="btn btn-primary" @click="LoginClick()">Login</button>
            </p>
        </div>
      </div>
  </modal>
</template>
<script>
import VModal from 'vue-js-modal'
import UserModel from '../../model/user.js'

export default {
  name: 'loginModal',
  data() {
    return {
        userName: '',
        password: '',
        remeber: false,
    }
  },
  methods: {
    async LoginClick() {
        console.log('login btn click')
        const result = await UserModel.login({
            userName: this.userName,
            password: this.password
        })
        if(result.status === 200) {
            const success = result.body.success;
            if(success) {
                this.$modal.hide('loginModal');
                this.$modal.show('dialog', {
                    title: 'Login sucess!',
                    text: result.body.message
                })
            }else {
                this.failLogin()
            }
        }else {
            this.failLogin()
        }
    },

    failLogin() {
        this.$modal.show('dialog', {
            title: 'Login failed!',
            text: 'Username or Password is incorrect!'
        })
    }
  },
}
</script>
<style lang="scss">
    .loginModal {
        .login-container {
            .head {
                width:128px;
                height: 128px;
                background-clip: content-box;
                background-color: rgba(243,246,248,.94);
                border: 4px solid #fff;
                box-shadow: inset 0 1.5px 3px 0 rgba(0,0,0,.15), 0 1.5px 3px 0 rgba(0,0,0,.15);
                box-sizing: content-box;
                margin: 20px auto;
                border-radius: 50%;
                overflow: hidden;
            }

            .login-content {
                padding: 20px;
                text-align: center;

                .login-input {
                    width:100%;
                    padding: 3px 10px;
                    border: none;
                    border:solid 1px #ccc;
                    border-radius: 3px;
                }

                .remeber {
                    margin-top: -15px;
                    color: #9e9e9e;

                    input {
                        vertical-align: middle;
                    }
                }
            }
        }
    }
</style>


