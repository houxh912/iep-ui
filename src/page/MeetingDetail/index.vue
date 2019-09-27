<template>
  <el-scrollbar style="height:100%">
    <div>
      <basic-container>
        <div class="wrap">
          <el-row>
            <el-col :span="12">
              <el-image :src="form.urls" class="img"></el-image>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col>
                  <div class="title">{{form.meetingTitle}}</div>
                </el-col>
                <el-col>
                  <div class="time">{{form.meetingTimeStart}} ～ {{form.meetingTimeEnd}}</div>
                  <div class="number">限额：{{form.meetingScale}}人</div>
                </el-col>
                <el-col>
                  <div class="address">{{form.address}}</div>
                </el-col>
                <el-col>
                  <el-row class="name">
                    <el-col :span="4">
                      <iep-img-avatar :size="50" :src="form.orgLogo" alt="头像"></iep-img-avatar>
                    </el-col>
                    <el-col :span="8">
                      <div class="userName">{{form.orgName}}</div>
                    </el-col>
                    <el-col :span="12">
                      <div class="userName">
                        <iep-button type="primary" @click="handleSignUp">我要报名</iep-button>
                      </div>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>

          <!-- 报名 -->
          <el-row class="numberTop" v-if="this.$router.history.current.query.isShow">
            <el-col :span="2">
              <div class="selectNumber">选择数量</div>
            </el-col>
            <el-col :span="22">
              <el-input-number v-model="ticketNumber" :min="1" :max="5" label="描述文字" @change="handleChange"></el-input-number>
            </el-col>
          </el-row>

          <el-row class="formTitle" v-if="this.$router.history.current.query.isShow">
            <h3>请填写公司信息</h3>
          </el-row>

          <div class="form" v-if="this.$router.history.current.query.isShow">
            <el-form label-width="120px" :model="formData" label-position="top" :ref="'ValidateForm'" v-for="(formData,index) in formData" :key="index" :rules="rules">
              <el-row>
                <el-col>
                  <div class="Line"></div>
                </el-col>
                <el-col>
                  <el-form-item label="组织:" prop="companyName">
                    <el-input v-model="formData.companyName"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="职位:" prop="position">
                    <el-input v-model="formData.position"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="姓名:" prop="name">
                    <el-input v-model="formData.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="联系电话:" prop="phoneNumber">
                    <el-input v-model="formData.phoneNumber"></el-input>
                  </el-form-item>
                </el-col>
                <el-col>
                  <el-form-item label="电子邮箱:" prop="email">
                    <el-input v-model="formData.email"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
            <iep-button type="primary" @click="submitForm('ValidateForm')">报名</iep-button>
          </div>
          <!-- 标签 -->
          <el-col :span="16">
            <iep-page-header title="会议内容"></iep-page-header>
            <div class="content">
              <iep-html v-model="form.content"></iep-html>
            </div>
          </el-col>

          <el-col :span="8">
            <iep-page-header title="会议地点"></iep-page-header>
            <div class="map">
              <baidu-map class="bm-view" ak="RingkKMiGtHhO44e91clv6GgRV4nZDxT" :center="address">
              </baidu-map>
            </div>
          </el-col>
        </div>
      </basic-container>
    </div>
  </el-scrollbar>
</template>
<script>
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import { initForm, rules } from './option'
import { postMeetingsignup, getmeetingmarketing } from '@/api/mcms/meeting'
export default {
  components: { BaiduMap },
  data () {
    return {
      formData: initForm(),
      form: { urls: '', orgName: '', orgLogo: '', content: '', meetingTitle: '', meetingTimeStart: '', meetingTimeEnd: '', address: '' },
      address: '',
      ticketNumber: '',
      subFrom: {
        companyName: '', // 公司
        position: '', // 职位
        name: '', // 姓名
        phoneNumber: '', // 联系电话
        email: '', // 电子邮箱
      },
      flag: false,
      rules,
    }
  },
  created () {
    this.loadPage()
  },
  methods: {
    loadPage () {
      //链接
      if (this.$route.params.id) {
        getmeetingmarketing(this.$route.params.id).then(res => {
          this.form = res.data.data
          this.address = res.data.data.provinceName
        })
      }
      //预览
      if (this.$route.query.preview) {
        this.form = this.$route.query.data
        this.form.urls = this.$route.query.data.attachs
      }
    },
    //报名
    handleSignUp () {
      this.$router.push({
        path: '/login',
        query: { redirect: `http://www.icanvip.net/meeting/${this.$route.params.id}?isShow=true` },
      })
      this.isShow = this.$router.history.current.query.isShow
    },
    handleChange (value) {
      if (value > this.formData.length) {
        this.formData.push(this.subFrom)
      } else if (value < this.formData.length) {
        this.formData.pop(this.subFrom)
      }
    },
    submitForm (formName) {
      let submitForm = {
        list: this.formData,
        mid: this.$route.params.id,
        number: this.ticketNumber,
      }
      for (let i = 0; i < this.formData.length; i++) {
        this.$refs[formName][i].validate((valid) => {
          if (valid) {
            this.flag = true
          } else {
            this.flag = false
          }
        })
      }
      if (this.flag) {
        if (this.$route.params.id) {
          postMeetingsignup(submitForm).then((res) => {
            this.$message({
              message: res.data.msg,
              type: 'success',
            })
          })
        } else {
          this.$message({
            message: '请从链接地址跳转报名！',
            type: 'warning',
          })
        }
      }
    },
  },
}
</script>
<style scoped>
.wrap {
  width: 100%;
  padding: 0 5%;
}
.img {
  width: 500px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 20px;
}
.title {
  font-size: 20px;
  font-weight: 500;
  padding: 30px 0 10px 0;
}
.time {
  padding: 15px 0;
}
.number {
  padding: 15px 0;
}
.address {
  padding: 15px 0;
}
.name {
  padding: 15px 0;
}
.avater {
  width: 50px;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 30px;
}
.userName {
  width: 100%;
  height: 50px;
  line-height: 50px;
}
.form {
  width: 100%;
  padding: 0 20%;
}
.Line {
  width: 100%;
  margin: 0 auto;
  height: 1px;
  background: #ccc;
  margin-top: 10px;
}
.tag {
  width: 100%;
  height: 80px;
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 20px;
}
.content {
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 20px;
}
.map {
  width: 100%;
  height: 300px;
  border: 1px solid #ccc;
}
.selectNumber {
  height: 40px;
  line-height: 40px;
}
.numberTop {
  margin-top: 20px;
}
.formTitle {
  width: 100%;
  padding: 0 20%;
  margin-top: 20px;
  /* margin-bottom: -20px; */
}
.bm-view {
  width: 100%;
  height: 300px;
  border-radius: 20px;
}
</style>