<template>
  <el-form class="form-detail" ref="form" :model="form">
    <el-form-item prop="username">
      <a-input ref="username" @keyup.enter.native="handleLogin" v-model="form.username" autocomplete="username" placeholder="请输入用户名" size="large">
        <a-icon slot="prefix" type="user" />
        <a-icon v-if="form.username" slot="suffix" type="close-circle" @click="emitEmpty('username')" />
      </a-input>
    </el-form-item>
    <el-form-item prop="password">
      <a-input ref="password" @keyup.enter.native="handleLogin" :type="passwordType" v-model="form.password" autocomplete="current-password" placeholder="请输入密码" size="large">
        <a-icon slot="prefix" type="lock" />
        <a-icon v-if="form.password" slot="suffix" :type="passwordType?'eye-invisible':'eye'" @click="showPassword" />
      </a-input>
    </el-form-item>
    <el-form-item prop="code">
      <a-input class="login-code" @keyup.enter.native="handleLogin" :maxlength="code.len" v-model="form.code" autocomplete="one-time-code" placeholder="请输入验证码" size="large">
        <img slot="addonAfter" :src="code.src" class="login-code-img" @click="refreshCode" />
      </a-input>
    </el-form-item>
    <el-form-item>
      <div class="login-text">
        将保持登陆状态
        <div class="check-text">
          <el-button type="text" @click="handleRetrieve">忘记密码?</el-button>
          <el-button type="text" @click="handleRegister">立即注册</el-button>
        </div>
      </div>
    </el-form-item>
    <el-form-item>
      <a-row :gutter="8">
        <a-col :span="12">
          <a-button type="primary" size="large" :loading="loginLoading" @click="handleLogin" block>登录</a-button>
        </a-col>
        <a-col :span="12">
          <a-button class="visitor" size="large" @click="$message.success('功能开发中')" block>访客</a-button>
        </a-col>
      </a-row>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      form: {
        username: '',
        password: '',
        code: '',
        redomStr: '',
      },
      code: {
        src: '/code',
        value: '',
        len: 4,
        type: 'image',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名/手机号', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少为6位', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 4, max: 4, message: '验证码长度为4位', trigger: 'blur' },
        ],
      },
      passwordType: 'password',
      loginLoading: false,
    }
  },
}
</script>
