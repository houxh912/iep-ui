<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <div class="login-weaper">
      <div class="login-border animated fadeInRight">
        <div class="login-main">
          <div class="title-image">
            <img src="/img/logo.png" class="top-image">
            <div class="login-title">用户登录</div>
          </div>
          <user-login v-if="activeName === 'user'"></user-login>
          <code-login v-else-if="activeName === 'code'"></code-login>
          <third-login v-else-if="activeName === 'third'"></third-login>
        </div>
        <div class="login-menu">
          <div class="menu-p">
            <span class="menu-line"></span>
            <span class="menu-text">其他方式登录</span>
            <span class="menu-line"></span>
          </div>
          <a href="#" @click.stop="activeName = 'user'">账号密码</a>
          <a href="#" @click.stop="activeName = 'code'">手机号登录</a>
          <a href="#" @click.stop="activeName = 'third'">第三方登录</a>
        </div>
        <div class="login-bottom">
          <hr>
          <div class="bottom-text">Copyright©GOVMADE 版权所有 2018-2020</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import userLogin from './userlogin'
import codeLogin from './codelogin'
import thirdLogin from './thirdlogin'
// import topColor from '../index/top/top-color'
import color from '@/mixins/color'
import { setStore } from '@/util/store'
import { mapGetters } from 'vuex'
import { validatenull } from '@/util/validate'
export default {
  name: 'Login',
  mixins: [color()],
  components: {
    // topColor,
    userLogin,
    codeLogin,
    thirdLogin,
  },
  data () {
    return {
      active: 1,
      activeName: 'user',
    }
  },
  watch: {
    $route () {
      const params = this.$route.query
      this.socialForm.state = params.state
      this.socialForm.code = params.code
      if (!validatenull(this.socialForm.state)) {
        const loading = this.$loading({
          lock: true,
          text: '登录中,请稍后。。。',
          spinner: 'el-icon-loading',
        })
        setTimeout(() => {
          loading.close()
        }, 2000)
        this.handleSocialLogin()
      }
    },
  },
  created () {
    setStore({ name: 'tenantId', content: 1 })
  },
  mounted () { },
  computed: {
    ...mapGetters(['website']),
  },
  props: [],
}
</script>
<style lang="scss" scoped>
.login-container {
  position: relative;
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
.login-weaper {
  width: 100%;
  height: 100%;
  background: url("/img/bg/bg.jpg") no-repeat;
  background-size: cover;
}
.login-container::before {
  z-index: -1024;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url("/img/bg/bg.jpg");
  background-size: cover;
}
.login-border {
  position: absolute;
  left: 50%;
  top: 0;
  margin-left: -270px;
  min-width: 540px;
  height: 100%;
  box-sizing: border-box;
  background-color: white;
  box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6);
}
.login-main {
  margin: 30px;
  box-sizing: border-box;
  .title-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
    margin-top: 50px;
    .top-image {
      width: 90px;
      border-right: 1px solid #eee;
      padding: 2px 0;
      padding-right: 20px;
      margin-right: 20px;
    }
    .login-title {
      font-size: 18px;
    }
  }
}
.login-menu {
  width: 100%;
  text-align: center;
  a {
    color: rgb(153, 153, 153);
    font-size: 12px;
    margin: 0px 8px;
    -webkit-transition: 0.1s;
    transition: 0.1s;
    &:hover, &:focus {
      outline: none;
      color: #b1b0b0;
    }
  }
}
.menu-p {
  height: 40px;
  line-height: 10px;
  text-align: center;
  .menu-line {
    display: inline-block;
    width: 180px;
    border-top: 1px solid #ccc;
  }
  .menu-text {
    color: #686868;
    vertical-align: middle;
    vertical-align: -4px;
    margin-right: 10px;
    margin-left: 10px;
  }
}
.login-bottom {
  margin: 0 auto;
  width: 80%;
  box-sizing: border-box;
  color: rgb(153, 153, 153);
  position: absolute;
  bottom: 20px;
  margin-left: 50px;
  margin-top: -50px;
  .bottom-text {
    margin-top: 15px;
    text-align: center;
  }
}
@media (max-width:1169px){
  .login-container {
    position: inherit;
    .login-border {
      position: inherit;
      top: inherit;
      left: inherit;
      right: inherit;
      margin: 0 auto;
      max-width: 520px;
      min-width: auto;
      .login-main {
        margin: 0;
        padding: 30px;
      }
    }
    .login-bottom {
      position: inherit;
      margin-top: 30px;
      margin-left: 0;
      width: 100%;
    }
  }
}
@media (max-width:992px){
  .menu-p {
    .menu-line {
      width: 15%;
    }
  }
}
@media(max-width:767px){
}
</style>
