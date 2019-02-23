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

<style lang="scss">
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
.login-left {
  float: left;
  width: 50%;
  position: relative;
}
.login-logo {
  position: absolute;
  top: 0;
  left: 0;
  padding-top: 50px;
  font-size: 24px;
  color: #333;
}
.login-info {
  padding-left: 140px;
}
.login-info-title {
  line-height: 90px;
  color: rgb(52, 58, 64);
}
.login-info-item {
  font-size: 14px;
  line-height: 2.5;
  color: rgb(33, 37, 41);
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
    margin-bottom: 40px;
    margin-top: 80px;
    .top-image {
      width: 100px;
      border-right: 1px solid #eee;
      padding: 2px 0;
      padding-right: 20px;
      margin-right: 20px;
    }
    .login-title {
      font-size: 22px;
    }
  }
}
.login-select {
  input {
    color: #333;
    font-size: 18px;
    font-weight: 400;
    border: none;
    text-align: center;
  }
}
.login-index {
  margin-top: 40px !important;
  width: 180px;
  height: 48px;
  text-align: center;
  border-radius: 50px !important;
  background: transparent !important;
  color: #333 !important;
  font-size: 16px !important;
  border: 1px solid rgb(152, 22, 244);
}
.login-submit {
  display: block !important;
  margin: 10px auto 10px auto !important;
  width: 100%;
  height: 48px;
  font-size: 14px !important;
  text-align: center;
  border: 0px;
  background-color: #ba1b20;
  color: white;
}
.login-submit:hover {
  background-color: #ba1b20 !important;
  color: white;
}
.login-visiter {
  display: block !important;
  margin: 20px auto 10px auto !important;
  width: 100%;
  height: 48px;
  font-size: 14px !important;
  text-align: center;
  border: 0px;
  background-color: #e4e4e4;
  color: black;
}
.login-visiter:hover {
  background-color: #e4e4e4 !important;
  color: black;
}
.login-menu {
  width: 100%;
  text-align: center;
  a {
    color: rgb(153, 153, 153);
    font-size: 12px;
    margin: 0px 8px;
  }
}
.menu-p {
  height: 60px;
  line-height: 30px;
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
.login-text {
  color: red;
  .check-text {
    float: right;
    color: red;
  }
}
.login-bottom {
  margin: 0 auto;
  width: 80%;
  box-sizing: border-box;
  color: rgb(153, 153, 153);
  position: absolute;
  bottom: 40px;
  margin-left: 50px;
  margin-top: -50px;
  .bottom-text {
    margin-top: 25px;
    text-align: center;
  }
}
.login-form {
  margin: 10px 0;
  i {
    color: #999;
  }
  .el-form-item__content {
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
  .el-input {
    .el-input__prefix {
      i {
        padding: 0 5px;
        font-size: 16px !important;
      }
    }
  }
}
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 38px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 38px;
  text-indent: 5px;
  text-align: center;
}
</style>
