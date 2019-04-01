<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <template>
        <el-tabs v-model="switchStatus" @tab-click="switchTab">
          <el-tab-pane label="信息管理" name="userManager" />
          <el-tab-pane label="密码管理" name="passwordManager" />
        </el-tabs>
      </template>
      <el-row>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" v-if="switchStatus === 'userManager'" class="demo-ruleForm">
              <el-form-item label="用户名" prop="username">
                <el-input type="text" v-model="form.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="真实姓名" prop="realName">
                <el-input v-model="form.realName" placeholder="请输入真实姓名"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="phone">
                <el-input v-model="form.phone" placeholder="验证码登录使用"></el-input>
              </el-form-item>
              <el-form-item label="头像">
                <iep-avatar v-model="form.avatar"></iep-avatar>
              </el-form-item>
              <el-form-item label="社交登录" prop="social">
                <a href="#" style="color: blue" @click="handleClick('wechat')">绑定微信</a>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交
                </el-button>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-form>
            <el-form :model="form" :rules="rules" ref="form" label-width="100px" v-if="switchStatus === 'passwordManager'" class="demo-ruleForm">
              <el-form-item label="原密码" prop="password">
                <el-input type="password" v-model="form.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="newpassword1">
                <el-input type="password" v-model="form.newpassword1" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="newpassword2">
                <el-input type="password" v-model="form.newpassword2" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('form')">提交
                </el-button>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>

<script>
// import { handleDown } from '@/api/admin/user'
import { openWindow } from '@/util/util'
import { mapState, mapActions } from 'vuex'
import store from '@/store'
import request from '@/router/axios'

export default {
  data () {
    var validatePass = (rule, value, callback) => {
      if (this.form.password !== '') {
        if (value !== this.form.newpassword1) {
          callback(new Error('两次输入密码不一致!'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    return {
      switchStatus: 'userManager',
      avatarUrl: '',
      show: false,
      headers: {
        Authorization: 'Bearer ' + store.getters.access_token,
      },
      form: {
        username: '',
        password: '',
        newpassword1: '',
        newpassword2: '',
        avatar: '',
        phone: '',
        realName: '',
      },
      rules: {
        password: [
          {
            required: true,
            min: 6,
            message: '原密码不能为空且不少于6位',
            trigger: 'change',
          },
        ],
        newpassword1: [
          { required: false, min: 6, message: '不少于6位', trigger: 'change' },
        ],
        newpassword2: [
          { required: false, validator: validatePass, trigger: 'blur' },
        ],
      },
    }
  },
  created () {
    this.form.username = this.userInfo.username
    this.form.phone = this.userInfo.phone
    this.form.avatar = this.userInfo.avatar
    this.form.realName = this.userInfo.realName
    this.switchStatus = 'userManager'
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.userInfo,
    }),
  },
  methods: {
    ...mapActions(['GetUserInfo']),
    switchTab (tab) {
      this.switchStatus = tab.name
    },
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          request({
            url: '/admin/user/edit',
            method: 'put',
            data: this.form,
          })
            .then(response => {
              if (response.data.data) {
                this.$notify({
                  title: '成功',
                  message: '修改成功',
                  type: 'success',
                  duration: 2000,
                })
                this.GetUserInfo()
                // 修改密码之后强制重新登录
                if (this.switchStatus === 'passwordManager') {
                  this.$store.dispatch('LogOut').then(() => {
                    location.reload() // 为了重新实例化vue-router对象 避免bug
                  })
                }
              } else {
                this.$notify({
                  title: '失败',
                  message: response.data.msg,
                  type: 'error',
                  duration: 2000,
                })
              }
            })
            .catch(() => {
              this.$notify({
                title: '失败',
                message: '修改失败',
                type: 'error',
                duration: 2000,
              })
            })
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleClick (thirdpart) {
      let appid, client_id, redirect_uri, url
      redirect_uri = encodeURIComponent(
        window.location.origin + '/#/authredirect?type=BIND'
      )
      if (thirdpart === 'wechat') {
        appid = 'wxd1678d3f83b1d83a'
        url =
          'https://open.weixin.qq.com/connect/qrconnect?appid=' +
          appid +
          '&redirect_uri=' +
          redirect_uri +
          '&state=' +
          appid +
          '&response_type=code&scope=snsapi_login#wechat_redirect'
      } else if (thirdpart === 'tencent') {
        client_id = '101322838'
        url =
          'https://graph.qq.com/oauth2.0/authorize?response_type=code&state=' +
          appid +
          '&client_id=' +
          client_id +
          '&redirect_uri=' +
          redirect_uri
      }
      openWindow(url, thirdpart, 540, 540)
    },
  },
}
</script>
