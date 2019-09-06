<template>
  <div class="iep-page-form">
    <basic-container>
      <iep-page-header title="发布会议"></iep-page-header>
      <el-form :model="formData" label-width="120px" ref="formName">
        <el-row>
          <el-col>
            <el-form-item label="请选择会议类型">
              <el-select v-model="formData.meetingType">
                <el-option v-for="item in meetingTypeOption" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="会议标题：">
              <el-input v-model="formData.meetingTitle"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="会议规模：">
              <el-select v-model="formData.meetingScale">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!-- <el-col :span="12">
            <el-form-item label="会议时间：">
              <el-date-picker v-model="formData.value1" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col> -->
          <el-col :span='12'>
            <el-form-item label="开始日间：">
              <IepDatePicker v-model="formData.meetingTimeStart" :picker-options="signTimeOption" type="datetime" class="time"></IepDatePicker>
            </el-form-item>
          </el-col>
          <el-col :span='12'>
            <el-form-item label="结束时间：">
              <IepDatePicker v-model="formData.meetingTimeEnd" :picker-options="finishTimeOption" type="datetime" class="time"></IepDatePicker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="会议地址：">
              <div style="display:flex;">
                <iep-cascader style="flex:2;" v-model="formData.cityAdrss" prefix-url="admin/city"></iep-cascader>
                <el-input style="flex:3;" v-model="formData.meetingAddress"></el-input>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="会议分类：">
              <el-checkbox-group v-model="formData.meetingClasses">
                <el-checkbox label="科技网络"></el-checkbox>
                <el-checkbox label="财经金融"></el-checkbox>
                <el-checkbox label="工业制造"></el-checkbox>
                <el-checkbox label="农林牧渔"></el-checkbox>
                <el-checkbox label="服务行业"></el-checkbox>
                <el-checkbox label="健康医疗"></el-checkbox>
                <el-checkbox label="教育培训"></el-checkbox>
                <el-checkbox label="学术研讨"></el-checkbox>
                <el-checkbox label="社群活动"></el-checkbox>
                <el-checkbox label=其他></el-checkbox>
              </el-checkbox-group>
              <!-- <el-checkbox-group v-model="formData.clientTypeKey">
                <el-checkbox v-for="item in dictGroup['meeting_marketing_type']" :key="item.value" :label="item.value" name="leixing">{{item.label}}</el-checkbox>
              </el-checkbox-group> -->
            </el-form-item>
          </el-col>
          <!-- <el-col>
            <el-form-item label="会议标签：">
              <iep-tag v-model="formData.tags"></iep-tag>
            </el-form-item>
          </el-col> -->
          <el-col>
            <el-form-item label="会议亮点：">
              <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" v-model="formData.meetingHighlights" placeholder="请填写几句会议核心亮点"></el-input>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="会议详情：">
              <iep-froala-editor v-model="formData.content"></iep-froala-editor>
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item label="海报：">
              <!-- <iep-avatar v-model="formData.attachs"></iep-avatar> -->
              <avatar-img v-model="formData.attachs"></avatar-img>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-row>
        <el-col :offset="11">
          <iep-button type="primary" @click="submitForm('formName')">发布</iep-button>
        </el-col>
      </el-row>
    </basic-container>
  </div>
</template>
<script>
import { initForm } from './option'
import { mapGetters } from 'vuex'
import { postMeetingmarketing } from '@/api/mcms/meeting'
import AvatarImg from './IepAvatar.vue'
export default {
  components: { AvatarImg },
  data () {
    return {
      // formData: { biaoti: '', area: [], address: '', clientTypeKey: [], tags: [], meetingContent: '', avatar: '' },
      formData: initForm(),
      // form: initForm(),
      options: [{
        value: '100',
        label: '100',
      }, {
        value: '200',
        label: '200',
      }, {
        value: '300',
        label: '300',
      }, {
        value: '400',
        label: '400',
      }, {
        value: '500',
        label: '500',
      }],

      meetingTypeOption: [{
        value: '会议',
        label: '会议',
      }, {
        value: '展会',
        label: '展会',
      }, {
        value: '沙龙',
        label: '沙龙',
      }],
      // value: '',
      // value1: '',
      signTimeOption: {
        disabledDate: (time) => {
          if (this.formData.meetingTimeEnd) {
            return time.getTime() > +new Date(this.formData.meetingTimeEnd)
          } else {
            return time.getTime() < 0
          }
        },
      },
      finishTimeOption: {
        disabledDate: (time) => {
          if (this.formData.meetingTimeStart) {
            return time.getTime() < +new Date(this.formData.meetingTimeStart)
          } else {
            return time.getTime() < 0
          }
        },
      },
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'dictGroup',
    ]),
  },
  created () {
    // console.log(this.dicGroup, this.userInfo)
  },
  methods: {
    submitForm (formName) {
      this.formData.meetingUrl = window.location.host + '/cfms_spa/meeting_detail'
      this.$refs[formName].validate((valid) => {
        if (valid) {
          postMeetingmarketing(this.formData).then(() => {
            this.$message({
              message: '会议增加成功！',
              type: 'success',
            })
          })
        } else {
          return false
        }
      })
    },
  },
}
</script>
<style scoped>
.el-select {
  width: 100%;
}
.time {
  width: 100%;
}
</style>