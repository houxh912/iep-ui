<template>
  <div class="iep-page-form">
    <el-form ref="form" class="form-detail" :rules="rules" :model="form" label-width="150px" size="small">
      <el-form-item label="申请人：" class="form-half">
        <span>{{form.name}}</span>
      </el-form-item>

      <el-form-item label="发起时间：" class="form-half">
        <span>{{form.nowTime}}</span>
      </el-form-item>

      <el-form-item label="岗位名称：" class="form-half">
        <span>{{form.positionName}}</span>
      </el-form-item>

      <iep-form-item class="form-half" label-name="原先组织(资产)">
        <span>{{form.deptQm}}</span>
      </iep-form-item>

      <iep-form-item class="form-half" label-name="原先部门">
        <iep-tag-detail :value="form.deptList"></iep-tag-detail>
      </iep-form-item>

      <iep-form-item class="form-half" prop="orgId" label-name="调入组织" tip="请选择想要调入组织">
        <iep-select v-model="form.orgId" filterable autocomplete="off" prefix-url="admin/org/all" placeholder="请选择调入组织"></iep-select>
      </iep-form-item>
      <iep-form-item class="form-half" prop="transferDeptList" label-name="调入部门" tip="请选择想要调入的部门">
        <iep-dept-select v-model="form.transferDeptList" :org-id="form.orgId"></iep-dept-select>
      </iep-form-item>

      <iep-form-item class="form-half" prop="transferPosition" label-name="调入岗位" tip="请选择想要调整的对应岗位">
        <iep-cascader v-model="form.transferPosition" prefix-url="hrms/post_type"></iep-cascader>
      </iep-form-item>

      <iep-form-item class="form-half" prop="endTime" label-name="调岗时间" tip="请选择想要调岗的时间">
        <iep-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></iep-date-picker>
      </iep-form-item>

      <iep-form-item prop="reason" label-name="申请理由" tip="请详细说明申请调岗的原因和理由。">
        <iep-input-area v-model="form.reason"></iep-input-area>
      </iep-form-item>

      <el-form-item label="附件：">
        <iep-upload v-model="form.annex">请上传附件</iep-upload>
      </el-form-item>

      <iep-form-item prop="approver" label-name="审批人" tip="请务必选择所属部门（组织）班长审批，谢谢！">
        <iep-contact-multiple-user v-model="form.approver" :filter-user-list="filterUserList"></iep-contact-multiple-user>
      </iep-form-item>

      <iep-form-item prop="cc" label-name="抄送人" tip="请务必抄送所属部门人力，谢谢！">
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
        this.form.orgId = this.userInfo.orgId
        if (!this.form.positionName) {
          this.$message('请找人力管理员申请岗位名')
          this.$router.history.go(-1)
          return
        }
        if (!this.form.dept.length) {
          this.$message('请找人力管理员申请部门')
          this.$router.history.go(-1)
          return
        }
      })
    },
    handlePublish () {
    },
  },
}
</script>
