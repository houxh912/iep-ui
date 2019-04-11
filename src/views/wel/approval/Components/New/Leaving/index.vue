<template>
  <div class="iep-page-form">
    <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="120px" size="small">
      <el-form-item label="申请人：" class="form-half">
        <span>{{form.name}}</span>
      </el-form-item>
      <el-form-item label="发起时间：" class="form-half">
        <span>{{form.nowTime}}</span>
      </el-form-item>
      <el-form-item label="请假类型：" class="form-half">
        <iep-dict-select v-model="form.leaveType" dict-name="hrms_levae_type"></iep-dict-select>
      </el-form-item>
      <el-form-item label="请假时长：" class="form-half">
        <!-- <iep-input-number v-model="form.duration"></iep-input-number> -->
        <el-input v-model="form.duration" disabled placeholder="请选择请假时间段"></el-input>
      </el-form-item>
      <el-form-item label="开始时间：" class="form-half">
        <iep-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期" @change="startChange(form.startTime)"></iep-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" class="form-half">
        <iep-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期" @change="endChange(form.endTime)"></iep-date-picker>
      </el-form-item>
      <el-form-item label=" 申请理由：" prop="reason">
        <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>
      <!-- <el-form-item label="附件：">
        <iep-upload v-model="form.annex">请上传附件</iep-upload>
      </el-form-item> -->
      <el-form-item label="审批人：" prop="approver">
        <iep-contact-multiple-user v-model="form.approver"></iep-contact-multiple-user>
      </el-form-item>
      <el-form-item label="抄送人：">
        <iep-contact-multiple-user v-model="form.cc"></iep-contact-multiple-user>
      </el-form-item>
      <el-form-item label="">
        <operation-wrapper>
          <iep-button type="primary" @click="handleSubmit">提交</iep-button>
          <iep-button @click="handlePublish">撤销</iep-button>
        </operation-wrapper>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import mixins from '../mixins'
export default {
  mixins: [mixins],
  data () {
    return {
      startTime: '',
      endTime: '',
    }
  },
  methods: {
    handlePublish () {
    },
    dealTime (val1, val2) {
      var str1 = val1.replace(/-/g, '/')
      var time1 = Date.parse(new Date(str1))
      var str2 = val2.replace(/-/g, '/')
      var time2 = Date.parse(new Date(str2))
      var duration = Math.floor((time2 - time1) / 60000)
      var hours = Math.floor(duration / 60)
      var minutes = duration - hours * 60
      this.form.duration = hours + '小时' + minutes + '分钟'
      if (time2 < time1) {
        this.$message.error('开始时间不能大于结束时间！！！')
      }
    },
    startChange (val) {
      this.startTime = val
      this.dealTime(val, this.endTime)
    },
    endChange (val) {
      this.endTime = val
      this.dealTime(this.startTime, val)
    },
  },
}
</script>
<style scoped>
.el-form-item__content span {
  display: inline-block;
}
</style>
