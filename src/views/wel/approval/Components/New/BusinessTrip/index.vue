<template>
  <div class="iep-page-form">
    <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="120px" size="small">
      <el-form-item label="申请人：" class="form-half">
        <span>{{form.name}}</span>
      </el-form-item>
      <el-form-item label="发起时间：" class="form-half">
        <span>{{form.nowTime}}</span>
      </el-form-item>
      <el-form-item class="form-half">
        <div slot="label">
          开始时间
          <iep-tip message="( TA 没有填写申请理由)" content="请务必精确到几点几分"></iep-tip>
          ：
        </div>
        <iep-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期" @change="startChange(form.startTime)"></iep-date-picker>
      </el-form-item>
      <el-form-item class="form-half">
        <div slot="label">
          结束时间
          <iep-tip message="( TA 没有填写申请理由)" content="请务必精确到几点几分"></iep-tip>
          ：
        </div>
        <iep-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期" @change="endChange(form.endTime)"></iep-date-picker>
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
      <el-form-item prop="approver">
        <div slot="label">
          审批人
          <iep-tip content="1、一天以内由直属领导审批（含1天）；<br/>2、二天以内由部门班长审批（含2天）；<br/>3、三天及以上总经理（郑总）审批（含3天）。"></iep-tip>
          ：
        </div>
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
