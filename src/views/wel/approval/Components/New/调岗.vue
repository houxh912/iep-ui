<template>
  <div class="">
    <el-form ref="form" :model="form" label-width="120px" size="small">
      <el-form-item label="申请人：" class="form-half">
        <span>{{form.name}}</span>
      </el-form-item>
      <el-form-item label="发起时间：" class="form-half">
        <span>{{form.createTime}}</span>
      </el-form-item>
      <el-form-item label="岗位名称：" class="form-half">
        <span>{{form.postName}}</span>
      </el-form-item>
      <el-form-item label="调入部门：" class="form-half">
        <span>{{form.transDepartment}}</span>
      </el-form-item>
      <el-form-item label="调入岗位：">
        <div style="display:flex;">
          <iep-cascader style="flex:1;" v-model="form.ipostName" prefix-url=""></iep-cascader>
          <el-input style="flex:3;" v-model="form.ipostName"></el-input>
        </div>
      </el-form-item>
      <el-form-item label="调岗时间：" class="form-half">
        <iep-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></iep-date-picker>
      </el-form-item>
      <el-form-item label="申请理由：">
        <el-input type="textarea" v-model="form.reason"></el-input>
      </el-form-item>
      <el-form-item label="附件：">
        <iep-upload v-model="form.annex"></iep-upload>
      </el-form-item>
      <el-form-item label="审批人：">
        <iep-contact-multiple v-model="form.approver"></iep-contact-multiple>
      </el-form-item>
      <el-form-item label="抄送人：">
        <iep-contact-multiple v-model="form.copyPerson"></iep-contact-multiple>
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
import IepContactMultiple from '@/components/IepContact/Multiple'
import IepUpload from '@/components/IepCommon/Upload'
export default {
  components: { IepContactMultiple, IepUpload },
  data () {
    return {
      backOption: {
        isBack: true,
        backPath: this.$route.query.redirect,
      },
      form: {
        approver: { // 比如接收人
          unions: [],
          orgs: [],
          users: [],
        },
        copyPerson: { // 比如接收人
          unions: [],
          orgs: [],
          users: [],
        },
        annex: [{ 'name': 'AINY4Y0AL3.txt', 'url': '04cd8be68d2846c197432e51ee8888b5.txt' }],
      },
      
    }
  },
  methods: {
    handlePublish () {
    },
    handleSubmit () {
    },
  },
}
</script>
<style scoped>
.edit-wrapper >>> .el-form {
  margin-right: 20%;
  margin-top: 50px;
}
</style>
