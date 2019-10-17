<template>
  <user-operation-layout>
    <div class="login-wrapper">
      <div class="title">
        <h1 :class="{'active':active===1}" @click="active=1">帐户密码登录</h1>
        <h1 :class="{'active':active===2}" @click="active=2">手机号登录</h1>
      </div>
      <login-password v-if="active===1" @onredirect="_goToRedirect"></login-password>
      <login-mobile v-if="active===2" @onredirect="_goToRedirect"></login-mobile>
      <template v-if="IS_ICAN">
        <el-divider>其他方式登录</el-divider>
        <div class="social-container">
          <div class="box qq" @click="handleClick('tencent')">
            <span class="container">
              <i icon-class="qq" class="iconfont icon-qq"></i>
            </span>
          </div>
          <div class="box wechat" @click="handleClick('wechat')">
            <span class="container">
              <i icon-class="wechat" class="iconfont icon-weixin"></i>
            </span>
          </div>
        </div>
      </template>

    </div>
    <select-dialog ref="SelectDialog" @load-page="refreshPage()" @login="handleSocialLogin()" @have="handleHave()"></select-dialog>
  </user-operation-layout>
</template>
<script>
import { mapActions } from 'vuex'
import UserOperationLayout from './index'
import { getBindCheck } from '@/api/admin/sys-social-details'
import { openWindow } from '@/util/util'
import { validatenull } from '@/util/validate'
import SelectDialog from './SelectDialog'
import LoginPassword from './Form/password'
import LoginMobile from './Form/mobile'
export default {
  components: {
    UserOperationLayout,
    SelectDialog,
    LoginPassword,
    LoginMobile,
  },
  name: 'Userlogin',
  data () {
    return {
      // eslint-disable-next-line
      IS_ICAN,
      active: 1,
      socialForm: {
        code: '',
        state: '',
      },
    }
  },
  watch: {
    '$route.query': {
      async handler (newName) {
        const params = newName
        if (params.isValid) {
          return
        } else {
          this.socialForm.state = params.state
          this.socialForm.code = params.code
          if (!validatenull(this.socialForm.state)) {
            const { data } = await getBindCheck(this.socialForm)
            if (data.code) {
              return
            }
            if (data.data) {
              const loading = this.$loading({
                lock: true,
                text: '登录中,请稍后。。。',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)',
              })
              setTimeout(() => {
                loading.close()
              }, 2000)
              this.handleSocialLogin()
            } else {
              // this.$message(data.msg + '请登陆后绑定账号')
              this.$refs['SelectDialog'].dialogShow = true
              this.$refs['SelectDialog'].form.code = params.code
              this.$refs['SelectDialog'].form.state = params.state
            }
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    ...mapActions(['LoginBySocial']),
    async handleSocialLogin () {
      await this.LoginBySocial(this.socialForm)
      this._goToRedirect()
    },
    handleHave () {
      this.$openPage('/login?redirect=/wel/account-settings/binding')
    },
    _goToRedirect () {
      if (this.$route.query.redirect) {
        this.$openPage(this.$route.query.redirect)
      } else {
        this.$openPage('/')
      }
    },
    handleClick (thirdpart) {
      let appid, client_id, redirect_uri, url
      const redirect = this.$route.query.redirect || '/'
      redirect_uri = encodeURIComponent(
        window.location.origin + '/authredirect?type=login&redirect=' + redirect
      )
      if (thirdpart === 'wechat') {
        appid = 'wx92d9fe94daef034e'
        url =
          'https://open.weixin.qq.com/connect/qrconnect?appid=' +
          appid +
          '&redirect_uri=' +
          redirect_uri +
          '&state=WX&response_type=code&scope=snsapi_login#wechat_redirect'
      } else if (thirdpart === 'tencent') {
        client_id = '101322838'
        url =
          'https://graph.qq.com/oauth2.0/authorize?response_type=code&state=QQ&client_id=' +
          client_id +
          '&redirect_uri=' +
          redirect_uri
      }
      openWindow(url, thirdpart, 540, 540)
    },
  },
}
</script>
<style lang="scss" scoped>
.login-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    h1 {
      color: #888;
      font-size: 18px;
      cursor: pointer;
      &.active {
        cursor: inherit;
        color: $--menu-color-primary;
        padding-bottom: 5px;
        border-bottom: 2px solid;
      }
    }
  }
}
.social-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 84px;
  .box {
    cursor: pointer;
    &:hover,
    &:focus {
      .title {
        opacity: 0.8;
      }
    }
  }
  .iconfont {
    color: #fff;
    font-size: 18px;
  }
  .container {
    $height: 28px;
    display: inline-block;
    width: $height;
    height: $height;
    line-height: $height;
    text-align: center;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .wechat {
    .container {
      background-color: #8bd430;
    }
    &:hover,
    &:focus {
      .container {
        background-color: #a3e254;
      }
    }
  }
  .qq {
    .container {
      background-color: #03a9f4;
    }
    &:hover,
    &:focus {
      .container {
        background-color: #46c3fb;
      }
    }
  }
}
@media (max-width: 767px) {
  .social-container {
    margin: 20px;
  }
}
</style>
