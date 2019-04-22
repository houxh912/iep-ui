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
          请假类型
          <iep-tip content="根据实际情况选择"></iep-tip>
          ：
        </div>
        <iep-dict-select v-model="form.leaveType" dict-name="hrms_levae_type"></iep-dict-select>
      </el-form-item>
      <el-form-item label="请假时长：" class="form-half">
        <!-- <iep-input-number v-model="form.duration"></iep-input-number> -->
        <el-input v-model="form.duration" disabled placeholder="请选择请假时间段"></el-input>
      </el-form-item>
      <el-form-item class="form-half">
        <div slot="label">
          开始时间
          <iep-tip content="请假实际开始时间，例如5月12日8：30"></iep-tip>
          ：
        </div>
        <iep-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期" @change="startChange(form.startTime)"></iep-date-picker>
      </el-form-item>
      <el-form-item class="form-half">
        <div slot="label">
          结束时间
          <iep-tip content="请假实际结束时间，例如5月12日17：30"></iep-tip>
          ：
        </div>
        <iep-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期" @change="endChange(form.endTime)"></iep-date-picker>
      </el-form-item>
      <el-form-item prop="reason">
        <div slot="label">
          申请理由
          <iep-tip content="因xxxx原因需请假x天，望领导批准。"></iep-tip>
          ：
        </div>
        <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>
      <!-- <el-form-item label="附件：">
        <iep-upload v-model="form.annex">请上传附件</iep-upload>
      </el-form-item> -->
      <el-form-item prop="approver">
        <div slot="label">
          审批人
          <iep-tip content="1、一天以内由直属领导审批（含1天）；</br>2、二天以内由部门班长审批（含2天）；</br>3、三天及以上总经理（郑总）审批（含3天）。"></iep-tip>
          ：
        </div>
        <iep-contact-multiple-user v-model="form.approver"></iep-contact-multiple-user>
      </el-form-item>
      <el-form-item>
        <div slot="label">
          抄送人
          <iep-tip content="请务必抄送所属部门人力和财务，谢谢！"></iep-tip>
          ：
        </div>
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
  data () {
    return {
    }
  },
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
<style scoped>
.el-form-item__content span {
  display: inline-block;
}
</style>
