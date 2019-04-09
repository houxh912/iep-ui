<template>
  <basic-container>
    <page-header :title="`${methodName}纪要`" :backOption="backOption"></page-header>

    <el-form :model="formData" :rules="rules" ref="form" label-width="100px" style="margin-bottom: 50px;">

      <el-form-item label="会议类型：" prop="meetingType">
        <el-radio-group v-model="formData.meetingType">
          <el-radio v-for="(item, index) in dictGroup.mlms_meeting_type" :key="index" :label="item.value" @change="typeChange">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="拜访对象：" prop="visitingUserId" v-if="formData.type == 1">
        <iep-select prefix-url="crm/customer" v-model="formData.visitingUserId" multiple></iep-select>
      </el-form-item>
      <el-form-item :label="`${formData.type == 0 ? '会议主题':'会议标题'}：`" prop="title">
        <el-input v-model="formData.title"></el-input>
      </el-form-item>
      <el-form-item label="会议内容：" prop="meetingContent">
        <el-input type="textarea" v-model="formData.meetingContent" rows=8></el-input>
      </el-form-item>
      <el-form-item label="会议总结：" prop="meetingCon">
        <el-input type="textarea" v-model="formData.meetingCon" rows=8></el-input>
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
          <el-radio v-for="(item, index) in dictGroup.mlms_visit_type" :key="index" :label="''+item.value">{{item.label}}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="" prop="visitingAddress" v-if="formData.visitType == '1' && formData.type == 1">
        <el-input v-model="formData.visitingAddress" placeholder="请输入面访具体地址"></el-input>
      </el-form-item>
      <el-form-item label="会议标签：" prop="tagKeyWords">
        <iep-tag v-model="formData.tagKeyWords"></iep-tag>
      </el-form-item>
      <el-form-item label="主持人：" prop="hostList">
        <div style="width: 200px;">
          <iep-contact-select v-model="formData.hostList"></iep-contact-select>
        </div>
      </el-form-item>
      <el-form-item label="参会人：" prop="attendeeList">
        <iep-contact-multiple v-model="formData.attendeeList"></iep-contact-multiple>
      </el-form-item>
      <el-form-item label="抄送人：" prop="receiverList">
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
    <footer-tool-bar>
      <iep-button type="primary" @click="saveDraft('form')">保存草稿</iep-button>
      <iep-button type="primary" @click="saveForm('form')">{{methodName}}</iep-button>
      <iep-button @click="resetForm('form')">取消</iep-button>
    </footer-tool-bar>
  </basic-container>
</template>
<script>
import { initFormData, dictsMap, rules } from './options'
import { mapState } from 'vuex'
import { getCustomerPage } from '@/api/crms/customer'
import { createData, updateData, getDataById } from '@/api/mlms/material/summary'

export default {
  data () {
    return {
      dictsMap,
      formRequestFn: createData,
      methodName: '创建',
      formData: initFormData(),
      rules,
      clientList: [],
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => {
          this.goBack()
        },
      },
      backRouter: '/wel/material/summary',
    }
  },
  computed: {
    ...mapState({
      dictGroup: state => state.user.dictGroup,
    }),
  },
  methods: {
    // 保存
    saveForm (formName) {
      delete this.formData.createTime
      delete this.formData.updateTime
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formData.status = 0
          this.submitForm()
        } else {
          return false
        }
      })
    },
    // 保存草稿
    saveDraft () {
      if (this.formData.title == '') {
        this.$message.error('请至少填写会议的标题！')
        return
      }
      this.formData.status = 1 // 草稿状态为 1
      this.submitForm()
    },
    // 提交数据
    submitForm () {
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
        this.goBack()
      })
    },
    // 重置表单
    resetForm () {
      this.goBack()
    },
    // 纪要类型转换
    typeChange (val) {
      if (val == 6) {
        this.$set(this.formData, 'type', 1)
      } else {
        this.$set(this.formData, 'type', 0)
      }
    },
    goBack () {
      // this.$router.push(this.backRouter)
      this.$router.go(-1)
    },
  },
  created () {
    // 首先获取query
    let query = this.$route.params
    // 若存在 id， 即为修改
    if (query.id) {
      getDataById(query.id).then(({ data }) => {
        data.data.receiverList = {
          orgs: data.data.receiver.orgs ? data.data.receiver.orgs : [],
          users: data.data.receiver.users ? data.data.receiver.users : [],
          unions: [],
        }
        data.data.attendeeList = {
          orgs: data.data.attendee.orgs ? data.data.attendee.orgs : [],
          users: data.data.attendee.users ? data.data.attendee.users : [],
          unions: [],
        }
        data.data.hostList = data.data.host.length > 0 ? data.data.host[0] : { id: '', name: '' }
        this.formData = { ...data.data }
        this.methodName = '修改'
        this.formRequestFn = updateData
      })
    }
    // 获取客户的数据
    getCustomerPage({ type: 1 }).then(({ data }) => {
      this.clientList = data.data.records
    })
  },
}
</script>
