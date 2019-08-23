<template>
  <iep-dialog :dialog-show="dialogShow" title="编辑组织" width="500px" @close="close">
    <el-form class="form-detail" :model="form" size="small" ref="form" label-width="100px">
      <iep-form-item label-name="组织Logo" prop="logo">
        <iep-img style="width: 80px;height: 80px;" :src="form.logo"></iep-img>
      </iep-form-item>
      <iep-form-item label-name="组织名称" prop="orgName">
        <el-input v-model="form.orgName" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="所有者" prop="belongUser">
        <el-input v-model="form.belongUser" disabled></el-input>
      </iep-form-item>
      <iep-form-item label-name="加入时间" prop="createTime">
        <iep-date-picker v-model="form.createTime" type="date" disabled></iep-date-picker>
      </iep-form-item>
      <iep-form-item label-name="模块权限" prop="moduleIds">
        <iep-select v-model="form.moduleIds" prefix-url="admin/module/union/module" multiple></iep-select>
      </iep-form-item>
    </el-form>
    <template slot="footer">
      <iep-button type="primary" :loading="submitFormLoading" @click="mixinsSubmitFormGen">提交</iep-button>
      <iep-button @click="close">取消</iep-button>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
import formMixins from '@/mixins/formMixins'
export default {
  mixins: [formMixins],
  data () {
    return {
      dialogShow: false,
      formRequestFn: () => { },
      form: initForm(),
    }
  },
  methods: {
    close () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    async submitForm () {
      this.form.orgId = this.form.id
      const { data } = await this.formRequestFn(this.form)
      if (data.data) {
        this.$message.success('操作成功')
        this.close()
      } else {
        this.$message(data.msg)
      }
    },
  },
}
</script>

