<template>
  <div class="login-container pull-height" @keyup.enter.native="handleLogin">
    <div class="login-weaper">
      <div class="login-border animated fadeInRight">
        <div class="login-main">
          <div class="title-image">
            <img src="/img/logo.png" class="top-image">
            <h4 class="login-title">
              欢迎注册
            </h4>
          </div>
          <user-login v-if="activeName === 'user'"></user-login>
        </div>
        <div class="login-menu">
          <p>已有账号？<a href="#" @click.prevent="loadLoginPage">立即登录</a></p>
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
  },
  data () {
    return {
      active: 1,
      activeName: 'user',
    }
  },
  methods: {
    loadLoginPage () {
      this.$router.push('/login')
    },
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
  background-image: url("/img/bg.jpg");
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
.login-menu {
  width: 100%;
  text-align: center;
  a {
    color: red;
    font-size: 14px;
    margin: 0px 8px;
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
</style>
