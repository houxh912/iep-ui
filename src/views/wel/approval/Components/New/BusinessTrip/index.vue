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
          <iep-tip content="请务必精确到几点几分"></iep-tip>
          ：
        </div>
        <iep-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期" @change="startChange(form.startTime)"></iep-date-picker>
      </el-form-item>
      <el-form-item class="form-half">
        <div slot="label">
          结束时间
          <iep-tip content="请务必精确到几点几分"></iep-tip>
          ：
        </div>
        <iep-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期" @change="endChange(form.endTime)" :picker-options="pickerOptions"></iep-date-picker>
      </el-form-item>
      <el-form-item class="form-half">
        <div slot="label">
          出差地点
          <iep-tip content="请务必精确市区，如舟山市定海区"></iep-tip>
          ：
        </div>
        <el-input v-model="form.busTripDistrict"></el-input>
      </el-form-item>
      <el-form-item label="出差时长：" class="form-half">
        <el-input v-model="form.duration" disabled></el-input>
        <!-- <iep-input-number v-model="form.duration"></iep-input-number> -->
      </el-form-item>
      <el-form-item prop="reason">
        <span slot="label">
          申请理由
          <iep-tip content="请务必说明出差对象+出差类型，如北京政务服务中心商务洽谈。"></iep-tip>
          ：
        </span>
        <iep-input-area v-model="form.reason"></iep-input-area>
      </el-form-item>
      <el-form-item label="附件：">
        <iep-upload v-model="form.annex">请上传附件</iep-upload>
      </el-form-item>
      <el-form-item prop="approver">
        <span slot="label">
          审批人
          <iep-tip content="请务必选择所属部门（组织）班长审批，谢谢！"></iep-tip>
          ：
        </span>
        <iep-contact-multiple-user v-model="form.approver" :filter-user-list="filterUserList"></iep-contact-multiple-user>
      </el-form-item>
      <el-form-item>
        <div slot="label">
          抄送人
          <iep-tip content="请务必抄送所属部门人力和财务，谢谢！"></iep-tip>
          ：
        </div>
        <iep-contact-multiple-user v-model="form.cc" :filter-user-list="filterUserList"></iep-contact-multiple-user>
      </el-form-item>
      <el-form-item label="">
        <operation-wrapper>
          <iep-button type="primary" @click="handleSubmit">提交</iep-button>
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
