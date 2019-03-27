<template>
  <div class="edit-wrapper">
    <basic-container>
      <page-header :title="`${methodName}招聘`" :backOption="backOption"></page-header>
      <el-form ref="form" :model="form" label-width="120px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="申请人：">
              {{form.name}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发起时间：">
              {{form.applyStartTime}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="入职时间：">
              {{form.entryTime}}
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="离职时间：">
              <el-input v-model="form.applyStartTime"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="岗位名称：">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="附件：">
          <el-input v-model="form.claim"></el-input>
        </el-form-item>
        <el-form-item label="审批人：">
          <el-input v-model="form.claim"></el-input>
        </el-form-item>
        <el-form-item label="抄送人：">
          <el-input v-model="form.claim"></el-input>
        </el-form-item>
        <el-form-item label="">
          <operation-wrapper>
            <iep-button type="primary" @click="handleSubmit">提交</iep-button>
            <iep-button @click="handlePublish">保存并发布</iep-button>
          </operation-wrapper>
        </el-form-item>
      </el-form>
    </basic-container>
  </div>
</template>
<script>
import { getApprovalInitiateById } from '@/api/wel/administrative_approval'
import { initForm, formToDto } from '../options'
import { mergeByFirst } from '@/util/util'
export default {
  props: {
    record: {
      type: Object,
      default: () => { },
    },
  },
  data () {
    return {
      id: false,
      methodName: '发布',
      formRequestFn: () => { },
      backOption: {
        isBack: true,
        backPath: null,
        backFunction: () => { this.$emit('onGoBack') },
      },
      form: initForm(),
    }
  },
  created () {
    this.methodName = this.record.methodName
    this.formRequestFn = this.record.formRequestFn
    this.id = this.record.id
    if (this.id) {
      getApprovalInitiateById(this.id).then(({ data }) => {
        this.form = mergeByFirst(initForm(), data.data)
      })
    }
  },
  methods: {
    handlePublish () {
      this.handleSubmit(true)
    },
    handleSubmit (isPublish) {
      const publish = isPublish === true ? true : false
      this.formRequestFn(formToDto(this.form), publish).then(({ data }) => {
        if (data.data) {
          this.$message({
            message: `招聘信息${this.methodName}成功`,
            type: 'success',
          })
          this.$emit('onGoBack')
        }
      })
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

<style lang="scss" scoped>
</style>
