<template>
  <div>
    <page-header :title="`${methodName}纪要`" :backOption="backOption"></page-header>

    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" style="margin-bottom: 50px;">

      <el-form-item label="会议类型：" prop="meetingType">
        <el-radio-group v-model="formData.meetingType">
          <el-radio v-for="(item, index) in dictGroup.mlms_meeting_type" :key="index" :label="item.value" @change="typeChange">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="拜访对象：" prop="visitingUserId" v-if="formData.type == 1">
        <iep-tags v-model="formData.visitingUserId"></iep-tags>
      </el-form-item>
      <el-form-item :label="`${formData.type == 0 ? '会议主题':'会议标题'}：`" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="会议内容：" prop="meetingContent">
        <el-input type="textarea" v-model="formData.meetingContent" rows=5></el-input>
      </el-form-item>
      <el-form-item label="会议总结：" prop="meetingCon">
        <el-input type="textarea" v-model="formData.meetingCon" rows=5></el-input>
      </el-form-item>
      <el-form-item label="备注：" prop="thoughtsProblem" v-if="formData.type==1">
        <el-input type="textarea" v-model="formData.thoughtsProblem" rows=5></el-input>
      </el-form-item>
      <el-form-item label="感想与困惑：" prop="thoughtsProblem" v-if="formData.type==0">
        <el-input type="textarea" v-model="formData.thoughtsProblem" rows=5></el-input>
      </el-form-item>
      <el-row>
        <el-col :span=12>
          <el-form-item label="会议时间" prop="meetingTime">
            <!-- <el-date-picker v-model="formData.meetingTime" type="date" placeholder="选择日期"></el-date-picker> -->
            <IepDatePicker v-model="formData.meetingTime"></IepDatePicker>
          </el-form-item>
        </el-col>
        <el-col :span=12 v-if="formData.type == 0">
          <el-form-item label="会议地点：" prop="meetingLocation">
            <el-input v-model="formData.meetingLocation"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="拜访形式：" prop="visitType" v-if="formData.type == 1">
        <el-radio-group v-model="formData.visitType">
          <el-radio v-for="(item, value) in dictsMap.visitType" :key="value" :label="+value">{{item}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="visitingAddress" v-if="formData.visitType == 0 && formData.type == 1">
        <el-input v-model="formData.visitingAddress" placeholder="请输入面访具体地址"></el-input>
      </el-form-item>
      <el-form-item label="会议标签：" prop="tagKeyWords">
        <iep-tags v-model="formData.tagKeyWords"></iep-tags>
      </el-form-item>
      <el-form-item label="主持人：" prop="">
        <iep-contact-select v-model="formData.hostList"></iep-contact-select>
      </el-form-item>
      <el-form-item label="参会人：" prop="">
        <iep-contact-multiple v-model="formData.attendeeList"></iep-contact-multiple>
      </el-form-item>
      <el-form-item label="抄送人：" prop="">
        <iep-contact-multiple v-model="formData.receiverList"></iep-contact-multiple>
      </el-form-item>
      <!-- <el-form-item label="接收人" prop="">
        <iep-contact-multiple v-model="formData.receiverList"></iep-contact-multiple>
      </el-form-item> -->
      <!-- <el-form-item label="关联报表" prop="baobiao">
        <iep-button><i class="el-icon-plus"></i></iep-button>
      </el-form-item>
      <el-form-item label="关联项目" prop="xiangmu">
        <iep-button><i class="el-icon-plus"></i></iep-button>
      </el-form-item> -->
      
    </el-form>
    <footer-toolbar>
      <iep-button type="primary" @click="submitForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </footer-toolbar>
  </div>
</template>
<script>
import { initFormData, dictsMap, rules } from './options'
import IepTags from '@/components/IepTags/input'
import FooterToolbar from '@/components/FooterToolbar/'
import IepContactMultiple from '@/components/IepContact/Multiple'
import IepContactSelect from '@/components/IepContact/Select'
import { mapState } from 'vuex'

export default {
  components: { IepTags, FooterToolbar, IepContactMultiple, IepContactSelect },
  data () {
    return {
      dictsMap,
      dialogShow: false,
      formRequestFn: () => { },
      methodName: '创建',
      formData: initFormData(),
      rules,
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.$emit('load-page', true)
        },
      },
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  methods: {
    loadPage () {
      this.$emit('load-page')
    },
    submitForm (formName) {
      delete this.formData.createTime
      delete this.formData.updateTime
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.hostId = this.formData.hostList.id
          this.formData.attendee = {
            orgIds: this.formData.attendeeList.orgs.map(m => m.id),
            userIds: this.formData.attendeeList.users.map(m => m.id),
          }
          this.formData.receiver = {
            orgIds: this.formData.receiverList.orgs.map(m => m.id),
            userIds: this.formData.receiverList.users.map(m => m.id),
          }
          this.formRequestFn(this.formData).then(() => {
            this.$notify({
              title: '成功',
              message: `${this.methodName}成功`,
              type: 'success',
              duration: 2000,
            })
            this.loadPage()
          })
        } else {
          return false
        }
      })
    },
    resetForm () {
      this.formData = initFormData()
      this.dialogShow = false
      this.loadPage('load-page')
    },
    typeChange (val) {
      if (val == 6) {
        this.$set(this.formData, 'type', 1)
      } else {
        this.$set(this.formData, 'type', 0)
      }
    },
    visitTypeChange () {},
  },
}
</script>
