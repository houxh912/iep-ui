<template>
  <iep-dialog :dialog-show="dialogShow" :title="`${methodName}令牌`" width="500px" @close="loadPage">
    <el-form :model="form" ref="form" size="small" label-width="100px" :disabled="disabled">
      <el-form-item label="用戶ID" prop="id">
        <el-input v-model="form.id" disabled></el-input>
      </el-form-item>
      <el-form-item label="用戶名" prop="name">
        <el-input v-model="form.name" disabled></el-input>
      </el-form-item>
      <el-form-item label="令牌" prop="token">
        <el-input v-model="form.token" disabled></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="form.type" disabled></el-input>
      </el-form-item>
      <el-form-item label="过期时间" prop="overTime">
        <el-input v-model="form.overTime" disabled></el-input>
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
import { initMemberForm } from './options'
export default {
  data () {
    return {
      dialogShow: false,
      disabled: false,
      formRequestFn: () => { },
      methodName: '创建',
      form: initMemberForm(),
    }
  },
  computed: {
  },
  methods: {
    loadPage () {
      this.form = initMemberForm()
      this.dialogShow = false
      this.$emit('load-page')
    },
    updateForm () {
      this.formRequestFn(this.form).then(({ data }) => {
        if (data.data) {
          this.$message.success('修改成功')
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

