<template>
  <div class="iep-input" :class="inputType">
    <span class="input-prefix" v-show="inputType=='left'"><i class="iconfont" :class="iconfont"></i></span>
    <el-input v-bind="$attrs" v-on="$listeners"></el-input>
    <span class="input-group-addon" v-show="inputType=='right-code'"><img :src="codeSrc" class="login-code-img" @click="refreshCode" /></span>
    <span class="input-group-addon" v-show="inputType=='right-mobile'">
      <el-button class="login-code-mobile" @click="handleSend" :disabled="inputDisabled">{{inputDisabled==false?'发送验证码':msgText}}</el-button>
    </span>
  </div>
</template>
<script>
export default {
  name: 'IepAntInput',
  inheritAttrs: false,
  props: {
    inputType: {
      type: String,
      default: 'left',
    },
    iconfont: {
      type: String,
      default: 'icon-denglu',
    },
    codeSrc: {
      type: String,
      default: '/code',
    },
    refreshCode: {
      type: Function,
      default: () => { },
    },
    handleSend: {
      type: Function,
      default: () => { },
    },
    inputDisabled: {
      type: Boolean,
      default: false,
    },
    msgText: {
      type: String,
      default: '',
    },
  },
}
</script>
<style lang="scss" scoped>
.input-prefix {
  position: absolute;
  top: 50%;
  left: 12px;
  z-index: 2;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  line-height: 0;
  color: rgba(0, 0, 0, 0.65);
}
.input-group-addon {
  padding: 0;
  height: 40px;
  white-space: nowrap;
  vertical-align: middle;
  border-left: 0;
  .login-code-img {
    padding: 0 0 1px 0;
    height: 100%;
    width: 100px;
    vertical-align: unset;
    box-sizing: border-box;
  }
  .login-code-mobile {
    width: 120px;
    height: 40px;
    border-left: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  img {
    vertical-align: middle;
    border-style: none;
  }
}
.right-mobile,
.right-code {
  display: flex;
  width: 100%;
}
.iconfont {
  font-size: 14px;
  font-weight: bold;
}

.iep-input ::v-deep .el-input__inner {
  font-size: 16px;
  line-height: 1.5;
}
.iep-input ::v-deep .el-input__inner:hover {
  border-color: $--menu-color-primary;
  border-right-width: 1px;
}
.iep-input ::v-deep .el-input__inner:focus {
  outline: 0;
  box-shadow: 0 0 0 2px mix($--color-primary, $--menu-color-second, 10%);
}
.left ::v-deep .el-input__inner {
  padding-left: 30px;
}
.right-code ::v-deep .el-input__inner {
  padding: 6px 11px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
.right-mobile ::v-deep .el-input__inner {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>
