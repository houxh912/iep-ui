<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}令牌`" width="500px" @close="loadPage">
    <el-form :model="form" ref="form" size="small" label-width="100px" :disabled="disabled">
      <el-form-item label="用戶名" prop="username">
        <el-input v-model="form.username" disabled></el-input>
      </el-form-item>
      <el-form-item label="access_token" prop="access_token">
        <el-input v-model="form.access_token" disabled></el-input>
      </el-form-item>
      <el-form-item label="refresh_token" prop="refresh_token">
        <el-input v-model="form.refresh_token" disabled></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="token_type">
        <el-input v-model="form.token_type" disabled></el-input>
      </el-form-item>
      <el-form-item label="过期时间" prop="expires_in">
        <el-input v-model="form.expires_in" disabled></el-input>
      </el-form-item>
    </el-form>
    <template slot="footer">
      <operation-wrapper>
        <iep-button @click="loadPage">取消</iep-button>
      </operation-wrapper>
    </template>
  </iep-dialog>
</template>
<script>
import { initForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      disabled: false,
      formRequestFn: () => { },
      methodName: '查看',
      form: initForm(),
    }
  },
  computed: {
  },
  methods: {
    loadPage () {
      this.form = initForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      this.formRequestFn(this.form).then(({ data }) => {
        if (data.data) {
          this.$message.success('操作成功')
          this.loadPage()
        } else {
          this.$message(data.msg)
        }
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.isAsset {
  color: red;
}
</style>

