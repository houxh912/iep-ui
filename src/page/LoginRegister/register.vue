<template>
  <user-operation-layout>
    <div class="login-wrapper">
      <div class="title">
        <div>
          <el-button v-if="active===2" icon="el-icon-back" type="text" @click="handleBack">返回</el-button>
        </div>
        <div v-if="active===1" class="h1">手机号注册</div>
        <div v-if="active===2" class="h1">确认密码</div>
        <div>
          <div style="width:55px;" v-if="active===2"></div>
        </div>
      </div>
      <register-mobile v-show="active===1" ref="RegisterMobile" @next="handleNext"></register-mobile>
      <register-password v-show="active===2" ref="RegisterPassword" @onredirect="_goToRedirect"></register-password>
      <third></third>
    </div>
  </user-operation-layout>
</template>
<script>
import UserOperationLayout from './wrapper'
import RegisterMobile from './Form/RegisterMobile'
import RegisterPassword from './Form/RegisterPassword'
import Third from './Form/Third'
export default {
  components: {
    UserOperationLayout,
    RegisterMobile,
    RegisterPassword,
    Third,
  },
  name: 'UserRegister',
  data () {
    return {
      active: 1,
    }
  },
  methods: {
    handleBack () {
      this.active = 1
      this.$refs['RegisterMobile'].form = {
        mobile: '',
        code: '',
      }
    },
    handleNext (form) {
      this.active = 2
      this.$refs['RegisterPassword'].form.mobile = form.mobile
      this.$refs['RegisterPassword'].form.code = form.code
    },
    _goToRedirect () {
      if (this.$route.query.redirect) {
        this.$openPage(this.$route.query.redirect)
      } else {
        this.$openPage('/')
      }
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
    justify-content: space-between;
    align-items: center;
    width: 100%;
    .h1 {
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
</style>
