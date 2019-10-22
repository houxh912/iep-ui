<template>
  <user-operation-layout>
    <div class="login-wrapper">
      <div class="title">
        <h1>手机号注册</h1>
      </div>
      <register-mobile @onredirect="_goToRedirect"></register-mobile>
      <third></third>
    </div>
  </user-operation-layout>
</template>
<script>
import UserOperationLayout from './wrapper'
import RegisterMobile from './Form/RegisterMobile'
import Third from './Form/Third'
export default {
  components: {
    UserOperationLayout,
    RegisterMobile,
    Third,
  },
  name: 'UserRegister',
  data () {
    return {
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
