<template>
  <div v-if="IS_ICAN" style="width:100%;">
    <el-divider>其他方式登录/注册</el-divider>
    <div class="social-container">
      <div class="box wechat" @click="handleClick('wechat')">
        <span class="container">
          <i icon-class="wechat" class="iconfont icon-weixin"></i>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from 'vuex'
import { getBindCheck } from '@/api/admin/sys-social-details'
import { validatenull } from '@/util/validate'
import { openWindow } from '@/util/util'
export default {
  data () {
    return {
      // eslint-disable-next-line
      IS_ICAN,
      socialForm: {
        code: '',
        state: '',
      },
    }
  },
  methods: {
    ...mapActions(['LoginBySocial']),
    async handleSocialLogin () {
      await this.LoginBySocial(this.socialForm)
      this._goToRedirect()
    },
    handleClick (thirdpart) {
      let appid, redirect_uri, url
      const redirect = this.$route.query.redirect || '/'
      redirect_uri = encodeURIComponent(
        window.location.origin + '/authredirect?type=login&redirect=' + redirect,
      )
      if (thirdpart === 'wechat') {
        appid = 'wx92d9fe94daef034e'
        url =
          'https://open.weixin.qq.com/connect/qrconnect?appid=' +
          appid +
          '&redirect_uri=' +
          redirect_uri +
          '&state=WX&response_type=code&scope=snsapi_login#wechat_redirect'
      }
      openWindow(url, thirdpart, 540, 540)
    },
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
              this.$message(data.msg + '老用户请登陆后绑定账号，新用户请用手机号注册绑定后登录')
              this.$router.push({ path: '/register', query: { ...this.socialForm, isValid: true } })
              // this.$openPage('/register')
              // this.$refs['SelectDialog'].dialogShow = true
              // this.$refs['SelectDialog'].form.code = params.code
              // this.$refs['SelectDialog'].form.state = params.state
            }
          }
        }
      },
      deep: true,
      immediate: true,
    },
  },
}
</script>
<style lang="scss" scoped>
.social-container {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 84px;
  width: 100%;
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
}
</style>
