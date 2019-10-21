<template>
  <user-operation-layout>
    <div class="login-wrapper">
      <div class="title">
        <h1 :class="{'active':active===1}" @click="active=1">帐户密码登录</h1>
        <h1 :class="{'active':active===2}" @click="active=2">免密码登录</h1>
      </div>
      <login-password v-if="active===1" @onredirect="_goToRedirect"></login-password>
      <login-mobile v-if="active===2" @onredirect="_goToRedirect"></login-mobile>
      <third></third>
    </div>
  </user-operation-layout>
</template>
<script>
import UserOperationLayout from './wrapper'
import LoginPassword from './Form/Password'
import LoginMobile from './Form/Mobile'
import Third from './Form/Third'
export default {
  components: {
    UserOperationLayout,
    LoginPassword,
    LoginMobile,
    Third,
  },
  name: 'Userlogin',
  data () {
    return {
      active: 1,
    }
  },
  methods: {
    // handleHave () {
    //   this.$openPage('/login?redirect=/wel/account-settings/binding')
    // },
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
</style>
