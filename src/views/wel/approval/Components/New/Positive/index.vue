<template>
  <div class="iep-page-form">
    <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="150px" size="small">

      <el-form-item label="申请人：" class="form-half">
        <span>{{form.name}}</span>
      </el-form-item>

      <el-form-item label="发起时间：" class="form-half">
        <span>{{form.nowTime}}</span>
      </el-form-item>

      <el-form-item label="入职时间：" class="form-half">
        <span>{{form.startTime}}</span>
      </el-form-item>

      <el-form-item label="转正时间：" class="form-half">
        <iep-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>

      <iep-form-item class="form-half" label-name="调入岗位" tip="请选择想要调整的对应岗位">
        <iep-cascader v-model="form.transferPosition" prefix-url="hrms/post_type"></iep-cascader>
      </iep-form-item>

      <iep-form-item class="form-half" label-name="申请理由" tip="建议从工作业绩结果描述，价值观，工作态度和技能，个人优势和不足等几方面描述" prop="reason">
        <iep-input-area v-model="form.reason"></iep-input-area>
      </iep-form-item>

      <iep-form-item class="form-half" label-name="附件" tip="可上传近期工作相关文档">
        <iep-upload v-model="form.annex">请上传附件</iep-upload>
      </iep-form-item>

      <iep-form-item class="form-half" label-name="审批人" tip="请务必选择所属部门（组织）班长审批，谢谢！" prop="approver">
        <iep-contact-multiple-user v-model="form.approver" :filter-user-list="filterUserList"></iep-contact-multiple-user>
      </iep-form-item>

      <iep-form-item class="form-half" label-name="抄送人" tip="请务必抄送所属部门人力和财务，谢谢！" prop="cc">
        <iep-contact-multiple-user v-model="form.cc" :filter-user-list="filterUserList"></iep-contact-multiple-user>
      </iep-form-item>

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
export default {
  mixins: [mixins],
  methods: {
    loadSelf () {
      this.fnSelf().then(({ data }) => {
        this.form = this.selfToVo(data.data)
      })
    },
    handlePublish () {
    },
  },
}
</script>
