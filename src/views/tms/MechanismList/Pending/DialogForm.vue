<template>
  <iep-dialog :dialog-show="dialogShow" title="认证申请" width="800px" @close="loadPage">
    <el-form :model="form" ref="form" :rules="rules" class="form-detail" size="small" label-width="100px">
      <el-form-item label="编号：" class="form-half">
        <iep-dev-detail></iep-dev-detail>
      </el-form-item>
      <el-form-item label="编号：" class="form-half">
        <iep-dev-detail>ssaasas</iep-dev-detail>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button type="primary" @click="updateForm()">认证通过</iep-button>
        <iep-button @click="loadPage">驳回</iep-button>
        <iep-button @click="loadPage">返回</iep-button>
      </operation-wrapper>
    </template>

  </iep-dialog>
</template>
<script>
import { initForm, rules } from '../options'
export default {
  data () {
    return {
      dialogShow: false,
      form: initForm(),
      rules,
    }
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
  },
}
</script>