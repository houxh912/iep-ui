<template>
  <div class="iep-page-form">
    <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="120px" size="small">
      <el-form-item label="申请人：" class="form-half">
        <span>{{form.name}}</span>
      </el-form-item>
      <el-form-item label="发起时间：" class="form-half">
        <span>{{form.nowTime}}</span>
      </el-form-item>
      <el-form-item label="开始时间：" class="form-half">
        <iep-date-picker v-model="form.startTime" type="date" placeholder="选择日期" @change="startChange(form.startTime)"></iep-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：" class="form-half">
        <iep-date-picker v-model="form.endTime" type="date" placeholder="选择日期" @change="endChange(form.endTime)"></iep-date-picker>
      </el-form-item>
      <el-form-item label="出差地点：" class="form-half">
        <el-input v-model="form.busTripDistrict"></el-input>
      </el-form-item>
      <el-form-item label="出差时长：" class="form-half">
        <el-input v-model="form.duration" disabled></el-input>
        <!-- <iep-input-number v-model="form.duration"></iep-input-number> -->
      </el-form-item>
      <el-form-item label="申请理由：" prop="reason">
        <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>
      <el-form-item label="附件：">
        <iep-upload v-model="form.annex">请上传附件</iep-upload>
      </el-form-item>
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
import { initNow } from '../options'
export default {
  mixins: [mixins],
  methods: {
    loadSelf () {
      this.fnSelf().then(({ data }) => {
        this.form = this.selfToVo(data.data)
        this.form.startTime = initNow()
      })
    },
    handlePublish () {
    },
  },
}
</script>
